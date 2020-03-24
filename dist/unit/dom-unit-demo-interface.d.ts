import { Properties, States } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
export interface DomUnitDemoProps extends Properties<TDomElement> {
    title?: string;
}
export interface DomUnitDemoStates extends States {
    testState: string;
}
export interface IDomUnitDemoGetStateOut<S> {
    state: S;
}
