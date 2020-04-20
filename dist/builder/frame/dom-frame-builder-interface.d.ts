import { IFrameElementOption } from 'ui-wrapper';
import { TDomElement } from '../../type/element-type';
import { DomUnit } from '../../unit/dom-unit-class';
export interface IDomFrameBuilderCheckChildrenLengthOut {
    status: boolean;
}
export interface IDomFrameBuilderAppendKeyPropertiesIn<P> {
    properties: P;
}
export interface IDomFrameBuilderAppendKeyPropertiesOut<P> {
    properties: P;
}
export interface IDomFrameElementOption<P, S> extends IFrameElementOption<TDomElement, P, S> {
    UnitConstructor: new () => DomUnit<P, S>;
}
