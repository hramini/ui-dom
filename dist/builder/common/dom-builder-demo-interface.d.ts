import { IBasicProperties } from 'ui-wrapper';
import { TDomElement } from '../../ui-dom-type';
export interface IDomBuilderDemoProperties extends IBasicProperties<TDomElement> {
    readonly name?: string;
    onClick?(): void;
}
