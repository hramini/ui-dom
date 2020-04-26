import { IFrameElementOption } from 'ui-wrapper';
import { TDomElement } from '../../type/element-type';
import { DomUnit } from '../../unit/dom-unit-class';

export interface IDomFrameBuilderCheckChildrenLengthOut {
  readonly status: boolean;
}

export interface IDomFrameBuilderAppendKeyPropertiesIn<P> {
  readonly properties: P;
}

export interface IDomFrameBuilderAppendKeyPropertiesOut<P> {
  readonly properties: P;
}

export interface IDomFrameElementOption<P, S> extends IFrameElementOption<TDomElement, P, S> {
  readonly UnitConstructor: new () => DomUnit<P, S>;
}
