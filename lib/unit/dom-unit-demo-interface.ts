import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';

export interface IDomUnitDemoProps extends IBasicProperties<TDomElement> {
  title?: string;
}

export interface IDomUnitDemoStates extends IBasicStates {
  testState: string;
}

export interface IDomUnitDemoGetStateOut<S> {
  state: S;
}
