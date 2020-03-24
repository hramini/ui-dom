import { FrameElementOption } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';
export interface IDomTagBuilderAppendPropertiesIn<P> {
    element: TDomElement;
    properties: P;
}
export interface IDomBuilderAppendChildrenIn {
    element: TDomElement;
    children?: string | Array<string | TDomElement>;
}
export interface IDomBuilderCheckPropertyValueType {
    value: any;
    type: string;
}
export interface IDomBuilderCheckChildrenIn {
    children?: string | Array<string | TDomElement>;
}
export interface DomFrameElementOption<P, S> extends FrameElementOption<TDomElement, P, S> {
    name: new () => DomUnit<P, S>;
}
export interface IDomFrameBuilderAppendChildrenToPropertiesIn<P> {
    properties: P;
    children?: string | Array<string | TDomElement>;
}
export interface IDomFrameBuilderCheckChildrenLengthIn {
    children?: string | Array<string | TDomElement>;
}
