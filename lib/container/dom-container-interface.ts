import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../ui-dom-type';
import { DomUnit } from '../unit/dom-unit-class';
import { DomContainer } from './dom-container-class';

export interface IDomContainerGetInstanceOut {
  readonly domContainer: DomContainer;
}

export interface ITaggedUnit {
  readonly domUnit: DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  updateTag: number;
  previousTag: number;
}

export interface IUnitInstance {
  [name: string]: ITaggedUnit;
}

export interface IDomContainerExtractUnitIn {
  readonly DomUnitConstructor: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
  readonly properties: IBasicProperties<TDomElement>;
}

export interface IDomContainerGetUnitsOut {
  units: IUnitInstance;
}

export interface IDomContainerCheckUnitExistenceOut {
  readonly status: boolean;
}

export interface IDomContainerGetNewUpdateTagOut {
  readonly updateTag: number;
}

export interface IDomContainerUpdateUnitTagOut {
  readonly domUnit: DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
}

export interface IDomContainerGetUnitKeyNameOut {
  readonly unitKeyName: string;
}
