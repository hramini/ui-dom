import { IElement, IUnitOnBeforeUpdateCheck } from 'ui-wrapper';
import { TDomElement } from '../ui-dom-type';
import { DomUnit } from './dom-unit-class';
import { IDomUnitDemoGetStateOut, IDomUnitDemoProps, IDomUnitDemoSetOnBeforeUpdateReturnIn, IDomUnitDemoStates, IDomUnitLifeCycleResultOut } from './dom-unit-demo-interface';
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
    getMountLifeCycleResult(): IDomUnitLifeCycleResultOut;
    getUpdateLifeCycleResult(): IDomUnitLifeCycleResultOut;
    getDisposeLifeCycleResult(): IDomUnitLifeCycleResultOut;
    setOnBeforeUpdateReturn(param: IDomUnitDemoSetOnBeforeUpdateReturnIn): void;
    getState(): IDomUnitDemoGetStateOut<IDomUnitDemoStates>;
}
