import { IBasicProperties, IElement, IFrameBuilder } from 'ui-wrapper';
import { TDomElement } from '../../ui-dom-type';
import { DomBuilder } from '../common/dom-builder-class';
import { IDomFrameElementOption } from './dom-frame-builder-interface';
export declare class DomFrameBuilder extends DomBuilder implements IFrameBuilder<TDomElement> {
    constructor();
    buildElement<P extends IBasicProperties<TDomElement>, S>(param: IDomFrameElementOption<P, S>): IElement<TDomElement>;
    private provideElement;
    private static appendKeyProperties;
}
