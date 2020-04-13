import { IBasicProperties, IElement, IFrameBuilder } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { DomContainer } from '../container/dom-container-class';
import { TDomElement } from '../type/element-type';
import { DomBuilder } from './dom-builder-class';
import {
  IDomFrameBuilderAppendKeyPropertiesIn,
  IDomFrameBuilderAppendKeyPropertiesOut,
  IDomFrameElementOption
} from './dom-builder-interface';

export class DomFrameBuilder extends DomBuilder implements IFrameBuilder<TDomElement> {
  private readonly doc: VirtualDocument;

  public constructor() {
    super();
    this.doc = new VirtualDocument();
  }

  public buildElement<P extends IBasicProperties<TDomElement>, S>(
    param: IDomFrameElementOption<P, S>
  ): IElement<TDomElement> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name: Unit, children } = param;
    let { properties } = param;
    DomBuilder.appendChildrenToProperties<P>({
      children,
      properties
    });
    const { properties: appendedKeyProperties } = DomFrameBuilder.appendKeyProperties<P>({
      properties
    });
    properties = { ...appendedKeyProperties };
    const { domContainer } = DomContainer.getInstance();
    const { unit: unitInstance, previousTag, updateTag } = domContainer.getUnit({
      properties,
      unit: Unit
    });
    const { element: unitElement } = this.doc.makeElement({
      tagName: `${Unit.name.toLowerCase()}-unit`
    });
    const { element } = unitInstance.getProvidedView();

    VirtualDocument.append({
      element,
      source: unitElement
    });
    VirtualDocument.setAttribute({
      attributeKey: 'pre-unit-data',
      attributeValue: previousTag.toString(),
      sourceElement: unitElement
    });
    VirtualDocument.setAttribute({
      attributeKey: 'unit-data',
      sourceElement: unitElement,
      attributeValue: updateTag.toString()
    });

    return { element: unitElement };
  }

  private static appendKeyProperties<P extends IBasicProperties<TDomElement>>(
    param: IDomFrameBuilderAppendKeyPropertiesIn<P>
  ): IDomFrameBuilderAppendKeyPropertiesOut<P> {
    const { properties } = param;
    const randomRangeNumber: number = 1000;

    // TODO: using validator class for this condition
    if (typeof properties.key === 'undefined') {
      // TODO: using Math class for this line
      properties.key = Math.floor(Math.random() * randomRangeNumber);
    }

    return { properties };
  }
}
