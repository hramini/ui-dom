import { IBasicProperties, IBasicStates } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';

export interface IDomUnitDemoProps extends IBasicProperties<TDomElement> {
  readonly title?: string;
}

export interface IDomUnitDemoSetOnBeforeUpdateReturnIn {
  readonly value: boolean;
}

export interface IDomUnitDemoStates extends IBasicStates {
  readonly testState: string;
}

export interface IDomUnitDemoGetStateOut<S> {
  readonly state: S;
}

export interface IDomUnitLifeCycleResultOut {
  readonly lifeCycleResult: string;
}
