import { IBasicProperties } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../../ui-dom-type';
import {
  IDomBuilderAppendChildrenToPropertiesIn,
  IDomBuilderCheckChildrenIn,
  IDomBuilderCheckChildrenOut,
  IDomBuilderCheckTypeOfIn,
  IDomBuilderCheckTypeOfOut
} from './dom-builder-interface';

export abstract class DomBuilder {
  protected doc: VirtualDocument;

  protected constructor() {
    this.doc = new VirtualDocument({ doc: document });
  }

  // TODO: this method will be removed after validator class being ready to uses
  protected static checkTypeOf<T>(param: IDomBuilderCheckTypeOfIn<T>): IDomBuilderCheckTypeOfOut {
    const { value, type } = param;

    // eslint-disable-next-line valid-typeof
    return { status: typeof value === type };
  }

  protected static checkChildren(param: IDomBuilderCheckChildrenIn): IDomBuilderCheckChildrenOut {
    const { children } = param;
    const childrenArray: (string | TDomElement)[] = children ?? [];

    return { status: childrenArray.length > 0 };
  }

  protected static appendChildrenToProperties<P extends IBasicProperties<TDomElement>>(
    param: IDomBuilderAppendChildrenToPropertiesIn<P>
  ): void {
    const { properties, children } = param;
    const { status: childrenLengthStatus } = DomBuilder.checkChildren({ children });

    if (childrenLengthStatus) {
      properties.children = children;
    }
  }
}
