import {
  IElement,
  IUnit,
  IUnitAlterStateIn,
  IUnitOnBeforeUpdateOut,
  Properties,
  VirtualDocument
} from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import {
  IDomUnitRunMountLifeCycleIn,
  IDomUnitRunUpdateLifeCycleIn,
  IDomUnitSetPropsIn
} from './dom-unit-interface';

export abstract class DomUnit<P, S> implements IUnit<TDomElement, P, S> {
  public props: Readonly<P> & Readonly<Properties<TDomElement>>;
  public state: Readonly<S>;
  private providedView: TDomElement;
  protected doc: VirtualDocument;

  protected constructor() {
    this.doc = new VirtualDocument({
      doc: document
    });
  }

  public onBeforeProvide(): void {}
  public onAfterProvide(): void {}
  public onBeforeUpdate(): IUnitOnBeforeUpdateOut {
    return { shouldUpdate: true };
  }
  public onAfterUpdate(): void {}
  public onBeforeDispose(): void {}
  public abstract provide(): IElement<TDomElement>;

  public runMountLifeCycle(param: IDomUnitRunMountLifeCycleIn<P>): void {
    const { properties } = param;
    this.setProps({ properties });
    this.onBeforeProvide();
    const { element } = this.provide();
    this.providedView = element;
    this.onAfterProvide();
  }

  public runUpdateLifeCycle(param: IDomUnitRunUpdateLifeCycleIn<P>): void {
    const { properties } = param;
    const { shouldUpdate } = this.onBeforeUpdate();
    if (shouldUpdate) {
      this.setProps({ properties });
      const { element } = this.provide();
      this.providedView = element;
      this.updateElementInDocument();
      this.onAfterUpdate();
    }
  }

  public runDisposeLifeCycle(): void {
    this.onBeforeDispose();
  }

  public getProvidedView(): IElement<TDomElement> {
    return { element: this.providedView };
  }

  public forceUpdate(): void {
    this.runUpdateLifeCycle({ properties: this.props });
  }

  public alterState<K extends keyof S>(param: IUnitAlterStateIn<S, K>): void {
    const { state, callback } = param;
    this.state = { ...this.state, ...state };
    this.runUpdateLifeCycle({ properties: this.props });
    callback && callback();
  }

  private setProps(param: IDomUnitSetPropsIn<P>): void {
    const { properties } = param;
    this.props = properties;
  }

  private updateElementInDocument(): void {
    const { isFound: isAttributeFound, attributeValue } = this.doc.findAttribute({
      sourceElement: this.providedView,
      attributeKey: 'pre-unit-data'
    });
    if (isAttributeFound) {
      const { isFound: isElementFound, foundElement } = this.doc.findFirstElementByQuery({
        query: `${this.providedView.tagName.toLowerCase()}[unit-data="${attributeValue}"]`
      });

      if (isElementFound) {
        this.doc.replaceElements({
          sourceElement: foundElement,
          replaceableElement: this.providedView
        });
      }
    }
  }
}
