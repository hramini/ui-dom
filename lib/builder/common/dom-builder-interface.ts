import { TDomElement } from '../../type/element-type';

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

// TODO: this interface will be removed after validator class being ready to use
export interface IDomBuilderCheckTypeOfIn<T> {
  readonly value: T;
  readonly type:
    | 'bigint'
    | 'boolean'
    | 'function'
    | 'number'
    | 'object'
    | 'string'
    | 'symbol'
    | 'undefined';
}

// TODO: this interface will be removed after validator class being ready to use
export interface IDomBuilderCheckTypeOfOut {
  readonly status: boolean;
}
