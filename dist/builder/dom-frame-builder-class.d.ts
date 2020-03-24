import { IElement, IFrameBuilder } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomFrameElementOption } from './dom-builder-interface';
export declare class DomFrameBuilder implements IFrameBuilder<TDomElement> {
    private doc;
    constructor();
    buildElement<P, S>(elementOption: DomFrameElementOption<P, S>): IElement<TDomElement>;
    private checkChildrenLength;
    private appendChildrenToProperties;
    private appendKeyProperties;
}
