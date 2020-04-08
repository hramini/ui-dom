import { IElement } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { IDomUnitDemoProps, IDomUnitDemoStates } from './dom-unit-demo-interface';
export declare class DomUnitFrameDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
    private readonly builder;
    constructor();
    provide(): IElement<TDomElement>;
}
