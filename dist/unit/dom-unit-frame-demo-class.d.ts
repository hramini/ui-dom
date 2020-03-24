import { IElement } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { DomUnitDemoProps, DomUnitDemoStates } from './dom-unit-demo-interface';
export declare class DomUnitFrameDemo extends DomUnit<DomUnitDemoProps, DomUnitDemoStates> {
    private builder;
    constructor();
    provide(): IElement<TDomElement>;
}
