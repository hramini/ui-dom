import { IFrameElementOption } from 'ui-wrapper';
import { TDomElement } from '../../ui-dom-type';
import { DomUnit } from '../../unit/dom-unit-class';
export interface IDomFrameBuilderAppendKeyPropertiesIn<P> {
    readonly properties: P;
}
export interface IDomFrameBuilderProvideElementIn<P, S> {
    UnitConstructor: new () => DomUnit<P, S>;
    properties: P;
}
export interface IDomFrameBuilderProvideElementOut {
    unitElement: TDomElement;
}
export interface IDomFrameElementOption<P, S> extends IFrameElementOption<TDomElement, P, S> {
    readonly UnitConstructor: new () => DomUnit<P, S>;
}
