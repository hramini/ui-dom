import { IPrimer, IPrimerElement, IPrimerTarget, IPrimerUnitPrototype, IUnit } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';

export class DomPrimer implements IPrimer<TDomElement> {
  public element: TDomElement;
  public target: HTMLElement;
  public readonly unitPrototype: IUnit<TDomElement, unknown, unknown>;

  public constructor() {
    this.unitPrototype = DomUnit.prototype;
  }

  public getUnitPrototype(): IPrimerUnitPrototype<TDomElement> {
    const { unitPrototype } = this;

    return { unitPrototype };
  }

  public setElement(param: IPrimerElement<TDomElement>): void {
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
