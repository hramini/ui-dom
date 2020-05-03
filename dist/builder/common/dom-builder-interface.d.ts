import { TDomElement } from '../../ui-dom-type';
export interface IDomBuilderCheckChildrenIn {
    readonly children?: (string | TDomElement)[];
}
export interface IDomBuilderCheckChildrenOut {
    readonly status: boolean;
}
export interface IDomBuilderAppendChildrenToPropertiesIn<P> {
    readonly properties: P;
    readonly children?: (string | TDomElement)[];
}
export interface IDomBuilderCheckTypeOfIn<T> {
    readonly value: T;
    readonly type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
}
export interface IDomBuilderCheckTypeOfOut {
    readonly status: boolean;
}
