// Generated by dts-bundle-generator v4.0.0

import { IBasicProperties, IElement, IFrameBuilder, IFrameElementOption, IPrimer, IPrimerElement, IPrimerTarget, ITagBuilder, ITagElementOption, IUnit, IUnitAlterStateOptions, IUnitOnBeforeUpdateCheck } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';

export declare type TDomElement = HTMLElement;
export interface IDomUnitRunMountLifeCycleIn<P> {
	properties: P;
}
export interface IDomUnitRunUpdateLifeCycleIn<P> {
	properties: P;
}
declare abstract class DomUnit<P, S> implements IUnit<TDomElement, P, S> {
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
export interface IDomBuilderCheckChildrenIn {
	children?: (string | TDomElement)[];
}
export interface IDomBuilderCheckChildrenOut {
	status: boolean;
}
export interface IDomFrameElementOption<P, S> extends IFrameElementOption<TDomElement, P, S> {
	name: new () => DomUnit<P, S>;
}
export interface IDomBuilderCheckTypeOfIn<T> {
	value: T;
	type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
}
export interface IDomBuilderCheckTypeOfOut {
	status: boolean;
}
declare abstract class DomBuilder {
	protected virtualDom: VirtualDocument;
	protected constructor();
	protected static checkTypeOf<T>(param: IDomBuilderCheckTypeOfIn<T>): IDomBuilderCheckTypeOfOut;
	protected static checkChildren(param: IDomBuilderCheckChildrenIn): IDomBuilderCheckChildrenOut;
}
export declare class DomFrameBuilder extends DomBuilder implements IFrameBuilder<TDomElement> {
	private readonly doc;
	constructor();
	buildElement<P, S>(param: IDomFrameElementOption<P, S>): IElement<TDomElement>;
	private static appendChildrenToProperties;
	private static appendKeyProperties;
}
export declare class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
	private readonly virtualDocument;
	constructor();
	buildElement<P, S>(param: ITagElementOption<TDomElement, P, S>): IElement<TDomElement>;
	private static appendChildren;
	private static appendProperties;
}
export declare class DomPrimer implements IPrimer<TDomElement> {
	element: HTMLElement;
	target: HTMLElement;
	constructor();
	setElement(param: IPrimerElement<HTMLElement>): void;
	setTarget(param: IPrimerTarget): void;
	start(): void;
}

export {};
