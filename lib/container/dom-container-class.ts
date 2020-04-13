import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';
import {
  IDomContainerCheckUnitExistenceIn,
  IDomContainerCheckUnitExistenceOut,
  IDomContainerGetInstanceOut,
  IDomContainerGetNewUpdateTag,
  IDomContainerGetUnitIn,
  IDomContainerGetUnitKeyNameIn,
  IDomContainerGetUnitKeyNameOut,
  IDomContainerGetUnitOut,
  IDomContainerSetUnitIn,
  IDomContainerUpdateUnitIn,
  IDomContainerUpdateUnitTag,
  IUnitInstance
} from './dom-container-interface';

export class DomContainer {
  private static domContainer: DomContainer;
  private readonly units: IUnitInstance;

  private constructor() {
    this.units = {};
  }

  public getUnit(param: IDomContainerGetUnitIn): IDomContainerGetUnitOut {
    const { unit, properties } = param;
    const { status } = this.checkUnitExistence({ unit, properties });

    if (status) {
      this.updateUnit({ unit, properties });
    } else {
      this.setUnit({ unit, properties });
    }
    const { unitKeyName } = DomContainer.getUnitKeyName({ unit, properties });
    const { unit: registeredUnit, updateTag, previousTag } = this.units[unitKeyName];

    return { unit: registeredUnit, updateTag, previousTag };
  }

  private setUnit(param: IDomContainerSetUnitIn): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { unit: UnitClass, properties } = param;
    const unitInstance: DomUnit<IBasicProperties<TDomElement>, IBasicStates> = new UnitClass();
    unitInstance.runMountLifeCycle({ properties });
    const { updateTag } = DomContainer.getNewUpdateTag();
    const { unitKeyName } = DomContainer.getUnitKeyName({ unit: UnitClass, properties });
    this.units[unitKeyName] = {
      unit: unitInstance,
      updateTag,
      previousTag: 0
    };
  }

  private updateUnit(param: IDomContainerUpdateUnitIn): void {
    const { unit, properties } = param;
    const { unitKeyName } = DomContainer.getUnitKeyName({ unit, properties });
    const { [unitKeyName]: taggedUnit } = this.units;
    const { unit: unitInstance } = taggedUnit;

    DomContainer.updateUnitTag({ taggedUnit });
    unitInstance.runUpdateLifeCycle({ properties });
  }

  private checkUnitExistence(
    param: IDomContainerCheckUnitExistenceIn
  ): IDomContainerCheckUnitExistenceOut {
    const { unit, properties } = param;
    const { unitKeyName } = DomContainer.getUnitKeyName({ unit, properties });
    const { [unitKeyName]: taggedUnit } = this.units;

    return { status: !!taggedUnit };
  }

  public static getInstance(): IDomContainerGetInstanceOut {
    // eslint-disable-next-line no-undefined
    if (DomContainer.domContainer === undefined) {
      DomContainer.domContainer = new DomContainer();
    }

    return { domContainer: DomContainer.domContainer };
  }

  private static updateUnitTag(param: IDomContainerUpdateUnitTag): void {
    const { taggedUnit } = param;
    taggedUnit.previousTag = taggedUnit.updateTag;
    const { updateTag } = DomContainer.getNewUpdateTag();
    taggedUnit.updateTag = updateTag;
  }

  private static getNewUpdateTag(): IDomContainerGetNewUpdateTag {
    const downRange: number = 10000000;
    const upRange: number = 99999999;
    const randomNumber: number = Math.random() * upRange + downRange;

    return { updateTag: Math.floor(randomNumber) };
  }

  private static getUnitKeyName(
    param: IDomContainerGetUnitKeyNameIn
  ): IDomContainerGetUnitKeyNameOut {
    const {
      unit: { name },
      properties: { key }
    } = param;
    const unitKeyName: string = `${name}-${key ?? ''}`;

    return { unitKeyName };
  }
}
