import { IElement, VirtualDocument } from 'ui-wrapper';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { DomUnitDemoProps, DomUnitDemoStates } from './dom-unit-demo-interface';

export class DomUnitSimpleDemo extends DomUnit<DomUnitDemoProps, DomUnitDemoStates> {
  private mountLifeCycleResult: string;
  private disposeLifeCycleResult: string;
  private updateLifeCycleResult: string;

  public constructor() {
    super();
    this.doc = new VirtualDocument();
    this.mountLifeCycleResult = 'C';
    this.updateLifeCycleResult = '';
    this.disposeLifeCycleResult = '';
  }

  public provide(): IElement<TDomElement> {
    this.mountLifeCycleResult += 'P';
    this.updateLifeCycleResult += 'P';
    const { element } = this.doc.makeElement({ tagName: 'dom-unit-demo' });
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
}
