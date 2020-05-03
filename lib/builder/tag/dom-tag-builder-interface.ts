import { TDomElement } from '../../ui-dom-type';

export interface IDomTagBuilderAppendPropertiesIn<P> {
  readonly element: TDomElement;
  readonly properties: P;
}

export interface IDomTagBuilderAppendChildrenIn {
  readonly element: TDomElement;
  readonly children?: (string | TDomElement)[];
}

// TODO: this type definition will be removed after using iterator instead of forEach in my code
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type PropertyEntriesType = [string, string | Function];
