import { IElement, IFrameBuilder } from 'ui-wrapper';
import { DomFrameBuilder } from '../builder/frame/dom-frame-builder-class';
import { TDomElement } from '../type/element-type';
import { DomUnit } from './dom-unit-class';
import { DomUnitDemo } from './dom-unit-demo-class';
import { IDomUnitDemoProps, IDomUnitDemoStates } from './dom-unit-demo-interface';

export class DomUnitFrameDemo extends DomUnit<IDomUnitDemoProps, IDomUnitDemoStates> {
  private readonly builder: IFrameBuilder<TDomElement>;

  public constructor() {
    super();

    this.builder = new DomFrameBuilder();
  }

  public provide(): IElement<TDomElement> {
    const { element } = this.builder.buildElement<IDomUnitDemoProps, IDomUnitDemoStates>({
      UnitConstructor: DomUnitDemo,
      properties: { key: 1 }
    });

    return { element };
  }
}
