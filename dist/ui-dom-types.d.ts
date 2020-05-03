// Generated by dts-bundle-generator v4.0.0

import { IBasicProperties, IElement, IFrameBuilder, IFrameElementOption, IPrimer, IPrimerElement, IPrimerTarget, IPrimerUnitPrototype, ITagBuilder, ITagElementOption, IUnit, IUnitAlterStateOptions, IUnitOnBeforeUpdateCheck } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';

export declare type TDomElement = HTMLElement;
export interface IDomBuilderCheckChildrenIn {
	readonly children?: (string | TDomElement)[];
}
export interface IDomBuilderCheckChildrenOut {
	readonly status: boolean;
}
export interface IDomBuilderAppendChildrenToPropertiesIn<P> {
	readonly properties: P;
	readonly children?: (string | TDomElement)[];
}
export interface IDomBuilderCheckTypeOfIn<T> {
	readonly value: T;
	readonly type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
}
export interface IDomBuilderCheckTypeOfOut {
	readonly status: boolean;
}
declare abstract class DomBuilder {
	protected doc: VirtualDocument;
	protected constructor();
	protected static checkTypeOf<T>(param: IDomBuilderCheckTypeOfIn<T>): IDomBuilderCheckTypeOfOut;
	protected static checkChildren(param: IDomBuilderCheckChildrenIn): IDomBuilderCheckChildrenOut;
	protected static appendChildrenToProperties<P extends IBasicProperties<TDomElement>>(param: IDomBuilderAppendChildrenToPropertiesIn<P>): void;
}
export interface IDomUnitRunMountLifeCycleIn<P> {
	readonly properties: P;
}
export interface IDomUnitRunUpdateLifeCycleIn<P> {
	readonly properties: P;
}
declare abstract class DomUnit<P, S> implements IUnit<TDomElement, P, S> {
	props: Readonly<P> & Readonly<IBasicProperties<TDomElement>>;
	state: Readonly<S>;
	protected doc: VirtualDocument;
	private providedView;
	abstract provide(): IElement<TDomElement>;
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
}
export interface IDomFrameElementOption<P, S> extends IFrameElementOption<TDomElement, P, S> {
	readonly UnitConstructor: new () => DomUnit<P, S>;
}
export declare class DomFrameBuilder extends DomBuilder implements IFrameBuilder<TDomElement> {
	constructor();
	buildElement<P extends IBasicProperties<TDomElement>, S>(param: IDomFrameElementOption<P, S>): IElement<TDomElement>;
	private provideElement;
	private static appendKeyProperties;
}
export declare class DomTagBuilder extends DomBuilder implements ITagBuilder<TDomElement> {
	constructor();
	buildElement<P extends IBasicProperties<TDomElement>>(param: ITagElementOption<TDomElement, P>): IElement<TDomElement>;
	private static appendChildren;
	private static appendProperties;
}
export declare class DomPrimer implements IPrimer<TDomElement> {
	element: TDomElement;
	target: HTMLElement;
	readonly unitPrototype: IUnit<TDomElement, unknown, unknown>;
	constructor();
	getUnitPrototype(): IPrimerUnitPrototype<TDomElement>;
	setElement(param: IPrimerElement<TDomElement>): void;
	setTarget(param: IPrimerTarget): void;
	start(): void;
}

export {};
