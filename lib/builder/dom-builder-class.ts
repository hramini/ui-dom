import { VirtualDocument } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import {
  IDomBuilderAppendChildrenIn,
  IDomBuilderCheckChildrenIn,
  IDomBuilderCheckPropertyValueType
} from './dom-builder-interface';

export abstract class DomBuilder {
  protected virtualDom: VirtualDocument;

  protected constructor() {
    this.virtualDom = new VirtualDocument();
  }

  private checkChildren(param: IDomBuilderCheckChildrenIn): boolean {
    const { children } = param;
    return !children || children.length > 0;
  }

  protected checkPropertyValueType(param: IDomBuilderCheckPropertyValueType): boolean {
    const { value, type } = param;
    return typeof value === type;
  }

  protected appendChildren(param: IDomBuilderAppendChildrenIn): void {
    const { element, children } = param;
    if (this.checkChildren({ children })) {
      element.innerHTML = '';
      if (this.checkPropertyValueType({ value: children, type: 'string' })) {
        element.append(children as string);
      } else {
        const arrayChildren: Array<string | TDomElement> = children as Array<string | TDomElement>;
        arrayChildren.map((child: string | TDomElement) => {
          element.append(child);
        });
      }
    }
  }
}
