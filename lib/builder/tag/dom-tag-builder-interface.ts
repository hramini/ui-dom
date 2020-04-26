import { TDomElement } from '../../type/element-type';

export interface IDomTagBuilderAppendPropertiesIn<P> {
  readonly element: TDomElement;
  readonly properties: P;
}

export interface IDomTagBuilderAppendChildrenIn {
  readonly element: TDomElement;
  readonly children?: (string | TDomElement)[];
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type PropertyEntriesType = [string, string | Function];
