import { IElement, IUnitOnBeforeUpdateCheck } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import {
  IDomUnitDemoGetStateOut,
  IDomUnitDemoProps,
  IDomUnitDemoSetOnBeforeUpdateReturnIn,
  IDomUnitDemoStates,
  IDomUnitLifeCycleResultOut
} from './dom-unit-demo-interface';

export class DomUnitDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
  private mountLifeCycleResult: string;
  private updateLifeCycleResult: string;
  private disposeLifeCycleResult: string;
  private onBeforeUpdateReturn: boolean;

  public constructor() {
    super();

    this.doc = new VirtualDocument({
      doc: document
    });
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
    const { onBeforeUpdateReturn } = this;
    this.updateLifeCycleResult = 'Bu';

    return { shouldUpdate: onBeforeUpdateReturn };
  }

  public onAfterUpdate(): void {
    this.updateLifeCycleResult += 'Au';
  }

  public onBeforeDispose(): void {
    this.disposeLifeCycleResult += 'Bd';
  }

  public provide(): IElement<TDomElement> {
    const { doc, props } = this;

    this.mountLifeCycleResult += 'P';
    this.updateLifeCycleResult += 'P';

    const { element } = doc.createNewElement({ tagName: 'dom-unit-demo' });
    const { title, children: childrenProperty } = props;

    VirtualDocument.setAttribute({
      attributeKey: 'title',
      attributeValue: title ?? '',
      element
    });

    // TODO: use validator class for checking these kinds of conditions
    const children: (string | TDomElement)[] = childrenProperty ?? [];

    children.map((child: string | TDomElement): string | TDomElement => {
      element.append(child);

      return child;
    });

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

  public setOnBeforeUpdateReturn(param: IDomUnitDemoSetOnBeforeUpdateReturnIn): void {
    const { value } = param;

    this.onBeforeUpdateReturn = value;
  }

  public getState(): IDomUnitDemoGetStateOut<IDomUnitDemoStates> {
    const { state } = this;

    return { state };
  }
}
