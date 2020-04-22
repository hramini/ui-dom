import { IElement, IUnitOnBeforeUpdateCheck } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import {
  IDomUnitDemoGetStateOut,
  IDomUnitDemoProps,
  IDomUnitDemoStates
} from './dom-unit-demo-interface';

export class DomUnitDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
  private mountLifeCycleResult: string;
  private updateLifeCycleResult: string;
  private disposeLifeCycleResult: string;
  private onBeforeUpdateReturn: boolean;

  public constructor() {
    super();
    this.mountLifeCycleResult = 'C';
    this.updateLifeCycleResult = '';
    this.disposeLifeCycleResult = '';
    this.onBeforeUpdateReturn = true;
  }

  public onBeforeProvide(): void {
    this.mountLifeCycleResult += 'Bp';
  }

  public onAfterProvide(): void {
    this.mountLifeCycleResult += 'Ap';
  }

  public onBeforeUpdate(): IUnitOnBeforeUpdateCheck {
    this.updateLifeCycleResult = 'Bu';

    return { shouldUpdate: this.onBeforeUpdateReturn };
  }

  public onAfterUpdate(): void {
    this.updateLifeCycleResult += 'Au';
  }

  public onBeforeDispose(): void {
    this.disposeLifeCycleResult += 'Bd';
  }

  public provide(): IElement<TDomElement> {
    this.doc = new VirtualDocument({
      doc: document
    });
    this.mountLifeCycleResult += 'P';
    this.updateLifeCycleResult += 'P';
    const { element } = this.doc.createNewElement({ tagName: 'dom-unit-demo' });
    VirtualDocument.setAttribute({
      attributeKey: 'title',
      attributeValue: this.props.title ?? '',
      element
    });
    const { children: childrenProperty } = this.props;
    // TODO: use validator class for checking these kinds of conditions
    const children: (string | TDomElement)[] = childrenProperty ?? [];
    children.map((child: string | TDomElement): string | TDomElement => {
      element.append(child);

      return child;
    });

    return { element };
  }

  public getMountLifeCycleResult(): string {
    return this.mountLifeCycleResult;
  }

  public getUpdateLifeCycleResult(): string {
    return this.updateLifeCycleResult;
  }

  public getDisposeLifeCycleResult(): string {
    return this.disposeLifeCycleResult;
  }

  public changeOnBeforeUpdateReturn(value: boolean): void {
    this.onBeforeUpdateReturn = value;
  }

  public getState(): IDomUnitDemoGetStateOut<IDomUnitDemoStates> {
    return { state: this.state };
  }
}
