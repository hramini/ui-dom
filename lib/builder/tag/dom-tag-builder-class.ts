import { IBasicProperties, IElement, ITagBuilder, ITagElementOption } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../../ui-dom-type';
import { DomBuilder } from '../common/dom-builder-class';
import {
  IDomTagBuilderAppendChildrenIn,
  IDomTagBuilderAppendPropertiesIn,
  PropertyEntriesType
} from './dom-tag-builder-interface';

export class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
  public constructor() {
    super();
  }

  public buildElement<P extends IBasicProperties<TDomElement>>(
    param: ITagElementOption<TDomElement, P>
  ): IElement<TDomElement> {
    const { doc } = this;
    const { name, properties, children } = param;
    const { element } = doc.createNewElement({ tagName: name });

    DomTagBuilder.appendProperties<P>({ element, properties });
    DomBuilder.appendChildrenToProperties({ children, properties });

    const { children: childrenProperty } = properties;

    DomTagBuilder.appendChildren({ children: childrenProperty, element });

    return { element };
  }

  private static appendChildren(param: IDomTagBuilderAppendChildrenIn): void {
    const { element, children } = param;
    const { status: childrenLengthStatus } = DomBuilder.checkChildren({ children });

    if (childrenLengthStatus) {
      VirtualDocument.setInnerHtml({
        element,
        innerHtml: ''
      });

      const arrayChildren: (string | TDomElement)[] = children as (string | TDomElement)[];

      // TODO: should be replaced with iterator class
      arrayChildren.forEach((child: string | TDomElement): void => {
        VirtualDocument.append({
          appendTo: element,
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
      const [key, value] = property;
      const { status } = DomBuilder.checkTypeOf({ type: 'function', value });

      // TODO: the else if condition should be change when validator class is ready
      if (status) {
        const functionKey: string = key.replace('on', '');

        element.addEventListener(functionKey.toLowerCase(), value as EventListener);
      } else if (key !== 'children') {
        VirtualDocument.setAttribute({
          attributeKey: key,
          attributeValue: value as string,
          element
        });
      }
    });
  }
}
