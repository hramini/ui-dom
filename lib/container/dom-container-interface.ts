import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';
import { DomContainer } from './dom-container-class';

export interface IDomContainerGetInstanceOut {
  domContainer: DomContainer;
}

export interface ITaggedUnit {
  unit: DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  updateTag: number;
  previousTag: number;
}

export interface IUnitInstance {
  [name: string]: ITaggedUnit;
}

export interface IDomContainerGetUnitIn {
  unit: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  properties: IBasicProperties<TDomElement>;
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type IDomContainerGetUnitOut = ITaggedUnit;

export interface IDomContainerFindUnitIn {
  unit: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
}

export interface IDomContainerFindUnitOut {
  unit: DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
}

export interface IDomContainerCheckUnitExistenceIn {
  unit: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  properties: IBasicProperties<TDomElement>;
}

export interface IDomContainerCheckUnitExistenceOut {
  status: boolean;
}

export interface IDomContainerSetUnitIn {
  unit: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  properties: IBasicProperties<TDomElement>;
}

export interface IDomContainerUpdateUnitIn {
  unit: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  properties: IBasicProperties<TDomElement>;
}

export interface IDomContainerGetNewUpdateTag {
  updateTag: number;
}

export interface IDomContainerUpdateUnitTag {
  taggedUnit: ITaggedUnit;
}

export interface IDomContainerGetUnitKeyNameIn {
  unit: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  properties: IBasicProperties<TDomElement>;
}

export interface IDomContainerGetUnitKeyNameOut {
  unitKeyName: string;
}

export interface IDomContainerUpdateElementInDocumentIn {
  taggedUnit: ITaggedUnit;
}
