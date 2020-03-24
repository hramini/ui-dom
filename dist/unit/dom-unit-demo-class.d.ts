import { IElement, IUnitOnBeforeUpdateOut } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { DomUnitDemoProps, DomUnitDemoStates, IDomUnitDemoGetStateOut } from './dom-unit-demo-interface';
export declare class DomUnitDemo extends DomUnit<DomUnitDemoProps, DomUnitDemoStates> {
    private mountLifeCycleResult;
    private updateLifeCycleResult;
    private disposeLifeCycleResult;
    private onBeforeUpdateReturn;
    constructor();
    onBeforeProvide(): void;
    onAfterProvide(): void;
    onBeforeUpdate(): IUnitOnBeforeUpdateOut;
    onAfterUpdate(): void;
    onBeforeDispose(): void;
    provide(): IElement<TDomElement>;
    getMountLifeCycleResult(): string;
    getUpdateLifeCycleResult(): string;
    getDisposeLifeCycleResult(): string;
    changeOnBeforeUpdateReturn(value: boolean): void;
    getState(): IDomUnitDemoGetStateOut<DomUnitDemoStates>;
}
