import { IElement } from 'ui-wrapper';
import { DomFrameBuilder } from '../builder/dom-frame-builder-class';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { DomUnitDemo } from './dom-unit-demo-class';
import { IDomUnitDemoProps, IDomUnitDemoStates } from './dom-unit-demo-interface';

export class DomUnitFrameDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
  private readonly builder: DomFrameBuilder;

  public constructor() {
    super();
    this.builder = new DomFrameBuilder();
  }

  public provide(): IElement<TDomElement> {
    const { element } = this.builder.buildElement({
      name: DomUnitDemo,
      properties: { key: 1 }
    });

    return { element };
  }
}
