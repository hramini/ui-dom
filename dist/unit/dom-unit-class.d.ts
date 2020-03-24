import { IElement, IUnit, IUnitAlterStateIn, IUnitOnBeforeUpdateOut, Properties, VirtualDocument } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { IDomUnitRunMountLifeCycleIn, IDomUnitRunUpdateLifeCycleIn } from './dom-unit-interface';
export declare abstract class DomUnit<P, S> implements IUnit<TDomElement, P, S> {
    props: Readonly<P> & Readonly<Properties<TDomElement>>;
    state: Readonly<S>;
    private providedView;
    protected doc: VirtualDocument;
    protected constructor();
    onBeforeProvide(): void;
    onAfterProvide(): void;
    onBeforeUpdate(): IUnitOnBeforeUpdateOut;
    onAfterUpdate(): void;
    onBeforeDispose(): void;
    abstract provide(): IElement<TDomElement>;
    runMountLifeCycle(param: IDomUnitRunMountLifeCycleIn<P>): void;
    runUpdateLifeCycle(param: IDomUnitRunUpdateLifeCycleIn<P>): void;
    runDisposeLifeCycle(): void;
    getProvidedView(): IElement<TDomElement>;
    forceUpdate(): void;
    alterState<K extends keyof S>(param: IUnitAlterStateIn<S, K>): void;
    private setProps;
    private updateElementInDocument;
}
