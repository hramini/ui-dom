import { IBasicProperties, IElement, ITagBuilder, ITagElementOption } from 'ui-wrapper';
import { TDomElement } from '../../ui-dom-type';
import { DomBuilder } from '../common/dom-builder-class';
export declare class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
    constructor();
    buildElement<P extends IBasicProperties<TDomElement>>(param: ITagElementOption<TDomElement, P>): IElement<TDomElement>;
    private static appendChildren;
    private static appendProperties;
}
