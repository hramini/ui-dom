import { TDomElement } from '../../type/element-type';

export interface IDomTagBuilderAppendPropertiesIn<P> {
  element: TDomElement;
  properties: P;
}

export interface IDomTagBuilderAppendChildrenIn {
  element: TDomElement;
  children?: (string | TDomElement)[];
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type PropertyEntriesType = [string, string | Function];
