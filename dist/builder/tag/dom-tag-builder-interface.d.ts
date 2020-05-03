import { TDomElement } from '../../ui-dom-type';
export interface IDomTagBuilderAppendPropertiesIn<P> {
    readonly element: TDomElement;
    readonly properties: P;
}
export interface IDomTagBuilderAppendChildrenIn {
    readonly element: TDomElement;
    readonly children?: (string | TDomElement)[];
}
export declare type PropertyEntriesType = [string, string | Function];
