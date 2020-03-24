import { IElement } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { DomUnitDemoProps, DomUnitDemoStates } from './dom-unit-demo-interface';
export declare class DomUnitSimpleDemo extends DomUnit<DomUnitDemoProps, DomUnitDemoStates> {
    private mountLifeCycleResult;
    private disposeLifeCycleResult;
    private updateLifeCycleResult;
    constructor();
    provide(): IElement<TDomElement>;
    getMountLifeCycleResult(): string;
    getUpdateLifeCycleResult(): string;
    getDisposeLifeCycleResult(): string;
}
