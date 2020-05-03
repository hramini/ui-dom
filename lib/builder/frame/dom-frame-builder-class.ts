import { IBasicProperties, IElement, IFrameBuilder } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { DomContainer } from '../../container/dom-container-class';
import { TDomElement } from '../../ui-dom-type';
import { DomBuilder } from '../common/dom-builder-class';
import {
  IDomFrameBuilderAppendKeyPropertiesIn,
  IDomFrameBuilderProvideElementIn,
  IDomFrameBuilderProvideElementOut,
  IDomFrameElementOption
} from './dom-frame-builder-interface';

export class DomFrameBuilder extends DomBuilder implements IFrameBuilder<TDomElement> {
  public constructor() {
    super();
  }

  public buildElement<P extends IBasicProperties<TDomElement>, S>(
    param: IDomFrameElementOption<P, S>
  ): IElement<TDomElement> {
    const { UnitConstructor, children, properties } = param;

    DomBuilder.appendChildrenToProperties<P>({
      children,
      properties
    });

    DomFrameBuilder.appendKeyProperties<P>({
      properties
    });

    const { unitElement } = this.provideElement({ UnitConstructor, properties });

    return { element: unitElement };
  }

  private provideElement<P, S>(
    param: IDomFrameBuilderProvideElementIn<P, S>
  ): IDomFrameBuilderProvideElementOut {
    const { doc } = this;
    const { UnitConstructor, properties } = param;
    const { domContainer } = DomContainer.getInstance();
    const { domUnit, previousTag, updateTag } = domContainer.extractUnit({
      DomUnitConstructor: UnitConstructor,
      properties
    });
    const { element } = domUnit.getProvidedView();
    const { element: unitElement } = doc.createNewElement({
      tagName: `${UnitConstructor.name.toLowerCase()}-unit`
    });

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

    return { unitElement };
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
