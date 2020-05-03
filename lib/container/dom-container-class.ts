import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../ui-dom-type';
import { DomUnit } from '../unit/dom-unit-class';
import {
  IDomContainerCheckUnitExistenceOut,
  IDomContainerExtractUnitIn,
  IDomContainerGetInstanceOut,
  IDomContainerGetNewUpdateTagOut,
  IDomContainerGetUnitKeyNameOut,
  IDomContainerGetUnitsOut,
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

  public extractUnit(param: IDomContainerExtractUnitIn): ITaggedUnit {
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
    const { units } = this.getUnits();
    const { [unitKeyName]: taggedUnit } = units;
    const { domUnit, updateTag, previousTag } = taggedUnit;

    return { domUnit, previousTag, updateTag };
  }

  private getUnits(): IDomContainerGetUnitsOut {
    const { units } = this;

    return { units };
  }

  private setUnit(): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { properties, DomUnitConstructor } = this;
    const domUnit: DomUnit<IBasicProperties<TDomElement>, IBasicStates> = new DomUnitConstructor();

    domUnit.runMountLifeCycle({ properties });

    const { updateTag } = DomContainer.getNewUpdateTag();
    const { unitKeyName } = this.getUnitKeyName();
    const { units } = this.getUnits();

    units[unitKeyName] = {
      domUnit,
      previousTag: 0,
      updateTag
    };
  }

  private updateUnit(): void {
    const { properties } = this;
    const { domUnit } = this.updateUnitTag();

    domUnit.runUpdateLifeCycle({ properties });
  }

  private checkUnitExistence(): IDomContainerCheckUnitExistenceOut {
    const { unitKeyName } = this.getUnitKeyName();
    const { units } = this.getUnits();
    const { [unitKeyName]: taggedUnit } = units;

    return { status: !!taggedUnit };
  }

  private updateUnitTag(): IDomContainerUpdateUnitTagOut {
    const { unitKeyName } = this.getUnitKeyName();
    const { units } = this.getUnits();
    const { [unitKeyName]: taggedUnit } = units;
    const { domUnit, updateTag } = taggedUnit;

    taggedUnit.previousTag = updateTag;

    const { updateTag: newUpdateTag } = DomContainer.getNewUpdateTag();

    taggedUnit.updateTag = newUpdateTag;

    return { domUnit };
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
