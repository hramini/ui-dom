import { IElement, IUnitOnBeforeUpdateOut, VirtualDocument } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import {
  DomUnitDemoProps,
  DomUnitDemoStates,
  IDomUnitDemoGetStateOut
} from './dom-unit-demo-interface';

export class DomUnitDemo extends DomUnit<DomUnitDemoProps, DomUnitDemoStates> {
  private mountLifeCycleResult: string = '';
  private updateLifeCycleResult: string = '';
  private disposeLifeCycleResult: string = '';
  private onBeforeUpdateReturn: boolean = true;

  public constructor() {
    super();
    this.mountLifeCycleResult = 'C';
  }

  public onBeforeProvide(): void {
    this.mountLifeCycleResult += 'Bp';
  }

  public onAfterProvide(): void {
    this.mountLifeCycleResult += 'Ap';
  }

  public onBeforeUpdate(): IUnitOnBeforeUpdateOut {
    this.updateLifeCycleResult = 'Bu';
    return { shouldUpdate: this.onBeforeUpdateReturn };
  }

  public onAfterUpdate(): void {
    this.updateLifeCycleResult += 'Au';
  }

  onBeforeDispose(): void {
    this.disposeLifeCycleResult += 'Bd';
  }

  public provide(): IElement<TDomElement> {
    this.doc = new VirtualDocument();
    // this.doc.createBase();
    this.mountLifeCycleResult += 'P';
    this.updateLifeCycleResult += 'P';
    const { element } = this.doc.makeElement({ tagName: 'dom-unit-demo' });
    element.setAttribute('title', this.props.title || '');
    if (typeof this.props.children === 'string') {
      element.innerHTML = this.props.children;
    } else {
      const children: Array<string | TDomElement> = this.props.children || [];
      children.map((child: string | TDomElement) => {
        element.append(child);
      });
    }
    // const children: string | Array<string | TDomElement> = this.props.children || [];
    // const { element } = this.builder.buildElement({
    //   name: 'dom-unit-demo',
    //   properties: {
    //     title: this.props.title
    //   },
    //   children
    // });
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

  public getState(): IDomUnitDemoGetStateOut<DomUnitDemoStates> {
    return { state: this.state };
  }
}
