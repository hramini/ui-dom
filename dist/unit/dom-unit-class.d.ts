import { IBasicProperties, IElement, IUnit, IUnitAlterStateOptions, IUnitOnBeforeUpdateCheck } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../type/element-type';
import { IDomUnitRunMountLifeCycleIn, IDomUnitRunUpdateLifeCycleIn } from './dom-unit-interface';
export declare abstract class DomUnit<P, S> implements IUnit<TDomElement, P, S> {
    props: Readonly<P> & Readonly<IBasicProperties<TDomElement>>;
    state: Readonly<S>;
    protected doc: VirtualDocument;
    private providedView;
    protected constructor();
    onBeforeProvide(): void;
    onAfterProvide(): void;
    onBeforeUpdate(): IUnitOnBeforeUpdateCheck;
    onAfterUpdate(): void;
    onBeforeDispose(): void;
    runMountLifeCycle(param: IDomUnitRunMountLifeCycleIn<P>): void;
    runUpdateLifeCycle(param: IDomUnitRunUpdateLifeCycleIn<P>): void;
    runDisposeLifeCycle(): void;
    getProvidedView(): IElement<TDomElement>;
    forceUpdate(): void;
    alterState<K extends keyof S>(param: IUnitAlterStateOptions<S, K>): void;
    private setProps;
    private updateElementInDocument;
    abstract provide(): IElement<TDomElement>;
}
