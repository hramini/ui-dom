import { TDomElement } from '../../type/element-type';
export interface IDomTagBuilderAppendPropertiesIn<P> {
    element: TDomElement;
    properties: P;
}
export interface IDomTagBuilderAppendChildrenIn {
    element: TDomElement;
    children?: (string | TDomElement)[];
}
export declare type PropertyEntriesType = [string, string | Function];
