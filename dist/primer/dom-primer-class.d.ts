import { IPrimer, IPrimerElement, IPrimerTarget } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
export declare class DomPrimer implements IPrimer<TDomElement> {
    element: TDomElement;
    target: HTMLElement;
    constructor();
    setElement(param: IPrimerElement<TDomElement>): void;
    setTarget(param: IPrimerTarget): void;
    start(): void;
}
