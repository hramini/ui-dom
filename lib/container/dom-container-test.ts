import { DomUnitDemo } from '../unit/dom-unit-demo-class';
import { DomContainer } from './dom-container-class';

describe('@DomContainer', (): void => {
  let domContainer: DomContainer;
  beforeEach((): void => {
    const { domContainer: domContainerInstance } = DomContainer.getInstance();
    domContainer = domContainerInstance;
  });

  describe('$#getInstance', (): void => {
    test('expects to be an instance of @DomContainer', (): void => {
      const { domContainer: domContainerInstance } = DomContainer.getInstance();

      expect(domContainerInstance).toBeInstanceOf(DomContainer);
    });
  });

  describe('#getUnit', (): void => {
    const mountLifeCycleText: string = 'CBpPAp';
    const updateLifeCycleText: string = 'BuPAu';

    test(`expects mountLifeCycleText to be ${mountLifeCycleText} after getting unit for the first time`, (): void => {
      const { unit } = domContainer.getUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: { key: 1 }
      });
      const domUnit: DomUnitDemo = unit as DomUnitDemo;

      expect(domUnit.getMountLifeCycleResult()).toBe(mountLifeCycleText);
    });

    test(`expects updateLifeCycleText to be ${updateLifeCycleText} after getting unit for the second and more time`, (): void => {
      domContainer.getUnit({ DomUnitConstructor: DomUnitDemo, properties: {} });
      const { unit: updatedUnit } = domContainer.getUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: {}
      });
      const domUnit: DomUnitDemo = updatedUnit as DomUnitDemo;

      expect(domUnit.getUpdateLifeCycleResult()).toBe(updateLifeCycleText);
    });

    test('expects updateTags to be different each times this method is called for the same unit', (): void => {
      const { updateTag } = domContainer.getUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: {}
      });
      const { updateTag: updatedUnitUpdateTag } = domContainer.getUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: {}
      });

      expect(updateTag).not.toBe(updatedUnitUpdateTag);
    });
  });
});
