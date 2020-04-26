/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import {
  IBasicProperties,
  IElement,
  IUnit,
  IUnitAlterStateOptions,
  IUnitOnBeforeUpdateCheck
} from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../type/element-type';
import {
  IDomUnitRunMountLifeCycleIn,
  IDomUnitRunUpdateLifeCycleIn,
  IDomUnitSetPropsIn
} from './dom-unit-interface';

export abstract class DomUnit<P, S> implements IUnit<TDomElement, P, S> {
  public props: Readonly<P> & Readonly<IBasicProperties<TDomElement>>;
  public state: Readonly<S>;
  protected doc: VirtualDocument;
  private providedView: TDomElement;

  public abstract provide(): IElement<TDomElement>;

  protected constructor() {
    this.doc = new VirtualDocument({
      doc: document
    });
  }

  public onBeforeProvide(): void {}

  public onAfterProvide(): void {}

  public onBeforeUpdate(): IUnitOnBeforeUpdateCheck {
    return { shouldUpdate: true };
  }

  public onAfterUpdate(): void {}

  public onBeforeDispose(): void {}

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
    const { providedView } = this;

    return { element: providedView };
  }

  public forceUpdate(): void {
    const { props } = this;

    this.runUpdateLifeCycle({ properties: props });
  }

  public alterState<K extends keyof S>(param: IUnitAlterStateOptions<S, K>): void {
    const { props, state } = this;
    const { state: paramState, callbackFunction } = param;

    this.state = { ...state, ...paramState };

    this.runUpdateLifeCycle({ properties: props });
    callbackFunction?.();
  }

  private setProps(param: IDomUnitSetPropsIn<P>): void {
    const { properties } = param;

    this.props = properties;
  }

  private updateElementInDocument(): void {
    const { providedView, doc } = this;
    const { isFound: isAttributeFound, attributeValue } = VirtualDocument.findAttribute({
      attributeKey: 'pre-unit-data',
      element: providedView
    });

    if (isAttributeFound) {
      const { tagName } = providedView;
      const { isFound: isElementFound, element } = doc.findFirstElementByQuery({
        query: `${tagName.toLowerCase()}[unit-data="${attributeValue}"]`
      });

      if (isElementFound) {
        VirtualDocument.replaceElements({
          replaceableElement: providedView,
          sourceElement: element
        });
      }
    }
  }
}
