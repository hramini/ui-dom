import { IPrimer, PrimerStartOptions, Unit } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from '../unit/dom-unit-class';

export class DomPrimer implements IPrimer<TDomElement> {
  public constructor() {
    Object.setPrototypeOf(Unit.prototype, DomUnit.prototype);
  }
  public start(param: PrimerStartOptions<TDomElement>): void {
    const { element, target } = param;
    target.append(element);
  }
}
