import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../../type/element-type';
export interface IDomBuilderDemoProperties extends IBasicProperties<TDomElement> {
    readonly name?: string;
    onClick?(): void;
}
export interface IDomBuilderDemoStates extends IBasicStates {
    readonly name?: string;
}
