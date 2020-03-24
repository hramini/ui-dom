import { IElement, IFrameBuilder, Properties, VirtualDocument } from 'ui-wrapper';
import { DomContainerDemo } from '../container/dom-container-demo-class';
import { TDomElement } from '../type/element-type';
import {
  DomFrameElementOption,
  IDomFrameBuilderAppendChildrenToPropertiesIn,
  IDomFrameBuilderCheckChildrenLengthIn
} from './dom-builder-interface';

export class DomFrameBuilder implements IFrameBuilder<TDomElement> {
  private doc: VirtualDocument;

  public constructor() {
    this.doc = new VirtualDocument();
  }

  public buildElement<P, S>(elementOption: DomFrameElementOption<P, S>): IElement<TDomElement> {
    const { name: Unit, properties, children } = elementOption;
    this.appendChildrenToProperties<P>({
      properties,
      children
    });
    this.appendKeyProperties<P>(properties);
    const { unit: unitInstance, previousTag, updateTag } = DomContainerDemo.getUnit({
      unit: Unit,
      properties
    });

    const { element: unitElement } = this.doc.makeElement({
      tagName: `${Unit.name.toLowerCase()}-unit`
    });
    const { element } = unitInstance.getProvidedView();

    this.doc.append({
      source: unitElement,
      element
    });
    this.doc.setAttribute({
      sourceElement: unitElement,
      attributeKey: 'pre-unit-data',
      attributeValue: previousTag.toString()
    });
    this.doc.setAttribute({
      sourceElement: unitElement,
      attributeKey: 'unit-data',
      attributeValue: updateTag.toString()
    });

    return { element: unitElement };
  }

  private checkChildrenLength(param: IDomFrameBuilderCheckChildrenLengthIn): boolean {
    const { children } = param;
    return !children || children.length > 0;
  }

  private appendChildrenToProperties<P extends Properties<TDomElement>>(
    param: IDomFrameBuilderAppendChildrenToPropertiesIn<P>
  ): void {
    const { properties, children } = param;
    if (this.checkChildrenLength({ children })) {
      properties.children = children;
    }
  }

  private appendKeyProperties<P extends Properties<TDomElement>>(props: P): void {
    if (!props.key) {
      props.key = Math.floor(Math.random() * 1000);
    }
  }
}
