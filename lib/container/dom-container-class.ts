import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';
import {
  IDomContainerCheckUnitExistenceOut,
  IDomContainerGetInstanceOut,
  IDomContainerGetNewUpdateTagOut,
  IDomContainerGetUnitIn,
  IDomContainerGetUnitKeyNameOut,
  IDomContainerUpdateUnitTagOut,
  ITaggedUnit,
  IUnitInstance
} from './dom-container-interface';

export class DomContainer {
  private static domContainer: DomContainer;
  private readonly units: IUnitInstance;
  private DomUnitConstructor: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  private properties: IBasicProperties<TDomElement>;

  private constructor() {
    this.units = {};
  }

  public extractUnit(param: IDomContainerGetUnitIn): ITaggedUnit {
    const { DomUnitConstructor, properties } = param;

    this.DomUnitConstructor = DomUnitConstructor;
    this.properties = properties;

    const { status } = this.checkUnitExistence();

    if (status) {
      this.updateUnit();
    } else {
      this.setUnit();
    }

    const { unitKeyName } = this.getUnitKeyName();
    const { unit: registeredUnit, updateTag, previousTag } = this.units[unitKeyName];

    return { previousTag, unit: registeredUnit, updateTag };
  }

  private setUnit(): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { properties } = this;
    const { DomUnitConstructor } = this;
    const domUnitInstance: DomUnit<
      IBasicProperties<TDomElement>,
      IBasicStates
    > = new DomUnitConstructor();

    domUnitInstance.runMountLifeCycle({ properties });

    const { updateTag } = DomContainer.getNewUpdateTag();
    const { unitKeyName } = this.getUnitKeyName();

    this.units[unitKeyName] = {
      previousTag: 0,
      unit: domUnitInstance,
      updateTag
    };
  }

  private updateUnit(): void {
    const { properties } = this;
    const { unitInstance } = this.updateUnitTag();

    unitInstance.runUpdateLifeCycle({ properties });
  }

  private checkUnitExistence(): IDomContainerCheckUnitExistenceOut {
    const { unitKeyName } = this.getUnitKeyName();
    const { [unitKeyName]: taggedUnit } = this.units;

    return { status: !!taggedUnit };
  }

  private updateUnitTag(): IDomContainerUpdateUnitTagOut {
    const { unitKeyName } = this.getUnitKeyName();
    const { [unitKeyName]: taggedUnit } = this.units;
    const { unit: unitInstance } = taggedUnit;

    taggedUnit.previousTag = taggedUnit.updateTag;

    const { updateTag } = DomContainer.getNewUpdateTag();

    taggedUnit.updateTag = updateTag;

    return { unitInstance };
  }

  private getUnitKeyName(): IDomContainerGetUnitKeyNameOut {
    const { properties, DomUnitConstructor } = this;
    const { key } = properties;
    const { name } = DomUnitConstructor;
    const unitKeyName: string = `${name}-${key ?? ''}`;

    return { unitKeyName };
  }

  public static getInstance(): IDomContainerGetInstanceOut {
    // TODO: use validator class for this condition
    // eslint-disable-next-line no-undefined
    if (DomContainer.domContainer === undefined) {
      DomContainer.domContainer = new DomContainer();
    }

    return { domContainer: DomContainer.domContainer };
  }

  private static getNewUpdateTag(): IDomContainerGetNewUpdateTagOut {
    const downRange: number = 10000000;
    const upRange: number = 99999999;
    const randomNumber: number = Math.random() * upRange + downRange;

    return { updateTag: Math.floor(randomNumber) };
  }
}
