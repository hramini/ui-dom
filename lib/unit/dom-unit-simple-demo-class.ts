import { IElement } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../ui-dom-type';
import { DomUnit } from './dom-unit-class';
import {
  IDomUnitDemoProps,
  IDomUnitDemoStates,
  IDomUnitLifeCycleResultOut
} from './dom-unit-demo-interface';

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
    const { doc } = this;

    this.mountLifeCycleResult += 'P';
    this.updateLifeCycleResult += 'P';

    const { element } = doc.createNewElement({ tagName: 'dom-unit-demo' });

    return { element };
  }

  public getMountLifeCycleResult(): IDomUnitLifeCycleResultOut {
    const { mountLifeCycleResult } = this;

    return { lifeCycleResult: mountLifeCycleResult };
  }

  public getUpdateLifeCycleResult(): IDomUnitLifeCycleResultOut {
    const { updateLifeCycleResult } = this;

    return { lifeCycleResult: updateLifeCycleResult };
  }

  public getDisposeLifeCycleResult(): IDomUnitLifeCycleResultOut {
    const { disposeLifeCycleResult } = this;

    return { lifeCycleResult: disposeLifeCycleResult };
  }
}
