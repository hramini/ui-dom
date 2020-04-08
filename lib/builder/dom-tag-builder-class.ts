import { IBasicProperties, IElement, ITagBuilder, ITagElementOption } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../type/element-type';
import { DomBuilder } from './dom-builder-class';
import {
  IDomTagBuilderAppendChildrenIn,
  IDomTagBuilderAppendPropertiesIn,
  PropertyEntriesType
} from './dom-builder-interface';

export class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
  private readonly virtualDocument: VirtualDocument;

  public constructor() {
    super();
    this.virtualDocument = new VirtualDocument({
      doc: document
    });
  }

  public buildElement<P, S>(param: ITagElementOption<TDomElement, P, S>): IElement<TDomElement> {
    const { name, properties, children } = param;
    const { element } = this.virtualDocument.makeElement({ tagName: name });
    DomTagBuilder.appendProperties<P>({ element, properties });
    DomTagBuilder.appendChildren({ element, children });

    return { element };
  }

  private static appendChildren(param: IDomTagBuilderAppendChildrenIn): void {
    const { element, children } = param;
    const { status: childrenLengthStatus } = DomBuilder.checkChildren({ children });

    if (childrenLengthStatus) {
      VirtualDocument.setInnerHtml({
        source: element,
        innerHtml: ''
      });

      const arrayChildren: (string | TDomElement)[] = children as (string | TDomElement)[];
      arrayChildren.forEach((child: string | TDomElement): void => {
        VirtualDocument.append({
          source: element,
          element: child
        });
      });
    }
  }

  private static appendProperties<P extends IBasicProperties<TDomElement>>(
    param: IDomTagBuilderAppendPropertiesIn<P>
  ): void {
    const { element, properties } = param;

    Object.entries(properties).forEach((property: PropertyEntriesType): void => {
      let [key] = property;
      const [, value] = property;
      const { status } = DomBuilder.checkTypeOf({ value, type: 'function' });

      if (status) {
        key = key.replace('on', '');
        element.addEventListener(key.toLowerCase(), value as EventListener);
      } else {
        element.setAttribute(key, value as string);
      }
    });
  }
}
