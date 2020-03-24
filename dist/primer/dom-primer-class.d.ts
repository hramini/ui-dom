import { IPrimer, PrimerStartOptions } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
export declare class DomPrimer implements IPrimer<TDomElement> {
    constructor();
    start(param: PrimerStartOptions<TDomElement>): void;
}
