import { IElement } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { IDomUnitDemoProps, IDomUnitDemoStates } from './dom-unit-demo-interface';

export class DomUnitSimpleDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
  private mountLifeCycleResult: string;
  private readonly disposeLifeCycleResult: string;
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
