import { IPrimer, IPrimerElement, IPrimerTarget } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
export declare class DomPrimer implements IPrimer<TDomElement> {
    element: HTMLElement;
    target: HTMLElement;
    constructor();
    setElement(param: IPrimerElement<HTMLElement>): void;
    setTarget(param: IPrimerTarget): void;
    start(): void;
}
