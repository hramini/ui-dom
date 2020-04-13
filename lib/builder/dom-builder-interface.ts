import { IFrameElementOption } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';

export interface IDomTagBuilderAppendPropertiesIn<P> {
  element: TDomElement;
  properties: P;
}

export interface IDomTagBuilderAppendChildrenIn {
  element: TDomElement;
  children?: (string | TDomElement)[];
}

export interface IDomBuilderCheckPropertyValueTypeOut {
  status: boolean;
}

export interface IDomBuilderCheckChildrenIn {
  children?: (string | TDomElement)[];
}

export interface IDomBuilderCheckChildrenOut {
  status: boolean;
}

export interface IDomFrameElementOption<P, S> extends IFrameElementOption<TDomElement, P, S> {
  name: new () => DomUnit<P, S>;
}

export interface IDomBuilderAppendChildrenToPropertiesIn<P> {
  properties: P;
  children?: (string | TDomElement)[];
}

export interface IDomFrameBuilderCheckChildrenLengthIn {
  children?: (string | TDomElement)[];
}

export interface IDomFrameBuilderCheckChildrenLengthOut {
  status: boolean;
}

export interface IDomFrameBuilderAppendKeyPropertiesIn<P> {
  properties: P;
}

export interface IDomFrameBuilderAppendKeyPropertiesOut<P> {
  properties: P;
}

export interface IDomBuilderCheckTypeOfIn<T> {
  value: T;
  type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
}

export interface IDomBuilderCheckTypeOfOut {
  status: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type PropertyEntriesType = [string, string | Function];
