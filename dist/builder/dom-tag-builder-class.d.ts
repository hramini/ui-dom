import { IBasicProperties, IElement, ITagBuilder, ITagElementOption } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomBuilder } from './dom-builder-class';
export declare class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
    private readonly virtualDocument;
    constructor();
    buildElement<P extends IBasicProperties<TDomElement>, S>(param: ITagElementOption<TDomElement, P, S>): IElement<TDomElement>;
    private static appendChildren;
    private static appendProperties;
}
