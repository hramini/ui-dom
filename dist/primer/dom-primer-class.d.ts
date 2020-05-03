import { IPrimer, IPrimerElement, IPrimerTarget, IPrimerUnitPrototype, IUnit } from 'ui-wrapper';
import { TDomElement } from '../ui-dom-type';
export declare class DomPrimer implements IPrimer<TDomElement> {
    element: TDomElement;
    target: HTMLElement;
    readonly unitPrototype: IUnit<TDomElement, unknown, unknown>;
    constructor();
    getUnitPrototype(): IPrimerUnitPrototype<TDomElement>;
    setElement(param: IPrimerElement<TDomElement>): void;
    setTarget(param: IPrimerTarget): void;
    start(): void;
}
