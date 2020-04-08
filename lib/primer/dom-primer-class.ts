import { IPrimer, IPrimerElement, IPrimerTarget, Unit } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';

export class DomPrimer implements IPrimer<TDomElement> {
  public element: HTMLElement;
  public target: HTMLElement;

  public constructor() {
    Object.setPrototypeOf(Unit.prototype, DomUnit.prototype);
  }

  public setElement(param: IPrimerElement<HTMLElement>): void {
    const { element } = param;
    this.element = element;
  }

  public setTarget(param: IPrimerTarget): void {
    const { target } = param;
    this.target = target;
  }

  public start(): void {
    this.target.append(this.element);
  }
}
