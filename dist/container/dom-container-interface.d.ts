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
    DomUnitConstructor: new () => DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
    properties: IBasicProperties<TDomElement>;
}
export interface IDomContainerCheckUnitExistenceOut {
    status: boolean;
}
export interface IDomContainerGetNewUpdateTagOut {
    updateTag: number;
}
export interface IDomContainerUpdateUnitTagOut {
    unitInstance: DomUnit<IBasicProperties<TDomElement>, IBasicStates>;
}
export interface IDomContainerGetUnitKeyNameOut {
    unitKeyName: string;
}
