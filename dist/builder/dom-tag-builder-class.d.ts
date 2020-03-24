import { IElement, ITagBuilder, TagElementOption } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomBuilder } from './dom-builder-class';
export declare class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
    constructor();
    buildElement<P, S>(param: TagElementOption<TDomElement, P, S>): IElement<TDomElement>;
    private appendProperties;
}
