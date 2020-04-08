import { IElement } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { IDomUnitDemoProps, IDomUnitDemoStates } from './dom-unit-demo-interface';
export declare class DomUnitSimpleDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
    private mountLifeCycleResult;
    private readonly disposeLifeCycleResult;
    private updateLifeCycleResult;
    constructor();
    provide(): IElement<TDomElement>;
    getMountLifeCycleResult(): string;
    getUpdateLifeCycleResult(): string;
    getDisposeLifeCycleResult(): string;
}
