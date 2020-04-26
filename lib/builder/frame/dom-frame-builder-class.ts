import { IBasicProperties, IElement, IFrameBuilder } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { DomContainer } from '../../container/dom-container-class';
import { TDomElement } from '../../type/element-type';
import { DomBuilder } from '../common/dom-builder-class';
import {
  IDomFrameBuilderAppendKeyPropertiesIn,
  IDomFrameElementOption
} from './dom-frame-builder-interface';

export class DomFrameBuilder extends DomBuilder implements IFrameBuilder<TDomElement> {
  private readonly doc: VirtualDocument;

  public constructor() {
    super();
    this.doc = new VirtualDocument();
  }

  public buildElement<P extends IBasicProperties<TDomElement>, S>(
    param: IDomFrameElementOption<P, S>
  ): IElement<TDomElement> {
    const { UnitConstructor, children } = param;
    const { properties } = param;

    DomBuilder.appendChildrenToProperties<P>({
      children,
      properties
    });

    DomFrameBuilder.appendKeyProperties<P>({
      properties
    });

    const { domContainer } = DomContainer.getInstance();
    const { unit: unitInstance, previousTag, updateTag } = domContainer.extractUnit({
      DomUnitConstructor: UnitConstructor,
      properties
    });
    const { element: unitElement } = this.doc.createNewElement({
      tagName: `${UnitConstructor.name.toLowerCase()}-unit`
    });
    const { element } = unitInstance.getProvidedView();

    VirtualDocument.append({
      appendTo: unitElement,
      element
    });
    VirtualDocument.setAttribute({
      attributeKey: 'pre-unit-data',
      attributeValue: previousTag.toString(),
      element: unitElement
    });
    VirtualDocument.setAttribute({
      attributeKey: 'unit-data',
      attributeValue: updateTag.toString(),
      element: unitElement
    });

    return { element: unitElement };
  }

  private static appendKeyProperties<P extends IBasicProperties<TDomElement>>(
    param: IDomFrameBuilderAppendKeyPropertiesIn<P>
  ): void {
    const { properties } = param;
    const randomRangeNumber: number = 1000;

    // TODO: using validator class for this condition
    if (typeof properties.key === 'undefined') {
      // TODO: using Math class for this line
      properties.key = Math.floor(Math.random() * randomRangeNumber);
    }
  }
}
