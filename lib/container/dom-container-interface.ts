import { Properties, States } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';

export interface TaggedUnit {
  unit: DomUnit<Properties<TDomElement>, States>;
  updateTag: number;
  previousTag: number;
}

export interface UnitInstance {
  [name: string]: TaggedUnit;
}

export interface IDomContainerGetUnitIn {
  unit: new () => DomUnit<Properties<TDomElement>, States>;
  properties: Properties<TDomElement>;
}

export interface IDomContainerGetUnitOut extends TaggedUnit {}

export interface IDomContainerFindUnitIn {
  unit: new () => DomUnit<Properties<TDomElement>, States>;
}

export interface IDomContainerFindUnitOut {
  unit: DomUnit<Properties<TDomElement>, States>;
}

export interface IDomContainerCheckUnitExistenceIn {
  unit: new () => DomUnit<Properties<TDomElement>, States>;
  properties: Properties<TDomElement>;
}

export interface IDomContainerSetUnitIn {
  unit: new () => DomUnit<Properties<TDomElement>, States>;
  properties: Properties<TDomElement>;
}

export interface IDomContainerUpdateUnitIn {
  unit: new () => DomUnit<Properties<TDomElement>, States>;
  properties: Properties<TDomElement>;
}

export interface IDomContainerGetNewUpdateTag {
  updateTag: number;
}

export interface IDomContainerUpdateUnitTag {
  taggedUnit: TaggedUnit;
}

export interface IDomContainerGetUnitKeyNameIn {
  unit: new () => DomUnit<Properties<TDomElement>, States>;
  properties: Properties<TDomElement>;
}

export interface IDomContainerGetUnitKeyNameOut {
  unitKeyName: string;
}

export interface IDomContainerUpdateElementInDocumentIn {
  taggedUnit: TaggedUnit;
}
