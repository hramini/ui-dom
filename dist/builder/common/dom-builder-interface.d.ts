import { TDomElement } from '../../type/element-type';
export interface IDomBuilderCheckPropertyValueTypeOut {
    status: boolean;
}
export interface IDomBuilderCheckChildrenIn {
    children?: (string | TDomElement)[];
}
export interface IDomBuilderCheckChildrenOut {
    status: boolean;
}
export interface IDomBuilderAppendChildrenToPropertiesIn<P> {
    properties: P;
    children?: (string | TDomElement)[];
}
export interface IDomFrameBuilderCheckChildrenLengthIn {
    children?: (string | TDomElement)[];
}
export interface IDomBuilderCheckTypeOfIn<T> {
    value: T;
    type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
}
export interface IDomBuilderCheckTypeOfOut {
    status: boolean;
}
