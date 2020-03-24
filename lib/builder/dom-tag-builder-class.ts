import { IElement, ITagBuilder, TagElementOption } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomBuilder } from './dom-builder-class';
import { IDomTagBuilderAppendPropertiesIn } from './dom-builder-interface';

export class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
  public constructor() {
    super();
  }
  public buildElement<P, S>(param: TagElementOption<TDomElement, P, S>): IElement<TDomElement> {
    const { name, properties, children } = param;
    const element: HTMLElement = document.createElement(name);
    this.appendProperties<P>({ element, properties });
    this.appendChildren({ element, children });
    return { element };
  }

  private appendProperties<P>(param: IDomTagBuilderAppendPropertiesIn<P>): void {
    const { element, properties } = param;
    properties &&
      Object.entries(properties).map(([key, value]) => {
        if (this.checkPropertyValueType({ value, type: 'function' })) {
          key = key.replace('on', '');
          element.addEventListener(key.toLowerCase(), value);
        } else {
          element.setAttribute(key, value);
        }
      });
  }
}
