import { Properties, States } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';
import {
  IDomContainerCheckUnitExistenceIn,
  IDomContainerGetNewUpdateTag,
  IDomContainerGetUnitIn,
  IDomContainerGetUnitKeyNameIn,
  IDomContainerGetUnitKeyNameOut,
  IDomContainerGetUnitOut,
  IDomContainerSetUnitIn,
  IDomContainerUpdateUnitIn,
  IDomContainerUpdateUnitTag,
  UnitInstance
} from './dom-container-interface';

export class DomContainer {
  protected static units: UnitInstance = {};

  public static getUnit(param: IDomContainerGetUnitIn): IDomContainerGetUnitOut {
    const { unit, properties } = param;
    if (this.checkUnitExistence({ unit, properties })) {
      this.updateUnit({ unit, properties });
    } else {
      this.setUnit({ unit, properties });
    }
    const { unitKeyName } = this.getUnitKeyName({ unit, properties });
    const { unit: registeredUnit, updateTag, previousTag } = this.units[unitKeyName];
    return { unit: registeredUnit, updateTag, previousTag };
  }

  private static setUnit(param: IDomContainerSetUnitIn): void {
    const { unit, properties } = param;
    const unitInstance: DomUnit<Properties<TDomElement>, States> = new unit();
    unitInstance.runMountLifeCycle({ properties });
    const { updateTag } = this.getNewUpdateTag();
    const { unitKeyName } = this.getUnitKeyName({ unit, properties });
    this.units[unitKeyName] = {
      unit: unitInstance,
      updateTag,
      previousTag: 0
    };
  }

  private static updateUnit(param: IDomContainerUpdateUnitIn): void {
    const { unit, properties } = param;
    const { unitKeyName } = this.getUnitKeyName({ unit, properties });
    const taggedUnit = this.units[unitKeyName];
    const { unit: unitInstance } = taggedUnit;

    this.updateUnitTag({ taggedUnit });
    unitInstance.runUpdateLifeCycle({ properties });
  }

  private static updateUnitTag(param: IDomContainerUpdateUnitTag): void {
    const { taggedUnit } = param;
    taggedUnit.previousTag = taggedUnit.updateTag;
    const { updateTag } = this.getNewUpdateTag();
    taggedUnit.updateTag = updateTag;
  }

  private static checkUnitExistence(param: IDomContainerCheckUnitExistenceIn): boolean {
    const { unit, properties } = param;
    const { unitKeyName } = this.getUnitKeyName({ unit, properties });
    return this.units[unitKeyName] !== undefined && this.units[name] !== null;
  }

  private static getNewUpdateTag(): IDomContainerGetNewUpdateTag {
    const down: number = 10000000;
    const up: number = 99999999;
    let randomNumber: number = Math.random() * up + down;
    return { updateTag: Math.floor(randomNumber) };
  }

  private static getUnitKeyName(
    param: IDomContainerGetUnitKeyNameIn
  ): IDomContainerGetUnitKeyNameOut {
    const { unit, properties } = param;
    const unitKeyName: string = `${unit.name}-${properties.key}`;
    return { unitKeyName };
  }
}
