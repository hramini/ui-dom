import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
export interface IDomBuilderDemoProperties extends IBasicProperties<TDomElement> {
    name?: string;
    onClick?(): void;
}
export interface IDomBuilderDemoStates extends IBasicStates {
    name?: string;
}
