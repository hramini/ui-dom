import { IElement, IUnitOnBeforeUpdateCheck } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { IDomUnitDemoGetStateOut, IDomUnitDemoProps, IDomUnitDemoStates } from './dom-unit-demo-interface';
export declare class DomUnitDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
    private mountLifeCycleResult;
    private updateLifeCycleResult;
    private disposeLifeCycleResult;
    private onBeforeUpdateReturn;
    constructor();
    onBeforeProvide(): void;
    onAfterProvide(): void;
    onBeforeUpdate(): IUnitOnBeforeUpdateCheck;
    onAfterUpdate(): void;
    onBeforeDispose(): void;
    provide(): IElement<TDomElement>;
    getMountLifeCycleResult(): string;
    getUpdateLifeCycleResult(): string;
    getDisposeLifeCycleResult(): string;
    changeOnBeforeUpdateReturn(value: boolean): void;
    getState(): IDomUnitDemoGetStateOut<IDomUnitDemoStates>;
}
