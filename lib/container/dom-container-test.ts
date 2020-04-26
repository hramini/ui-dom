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

  describe('#extractUnit', (): void => {
    const mountLifeCycleText: string = 'CBpPAp';
    const updateLifeCycleText: string = 'BuPAu';

    test(`expects mountLifeCycleText to be ${mountLifeCycleText} after getting unit for the first time`, (): void => {
      const { unit } = domContainer.extractUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: { key: 1 }
      });
      const domUnit: DomUnitDemo = unit as DomUnitDemo;
      const { lifeCycleResult } = domUnit.getMountLifeCycleResult();

      expect(lifeCycleResult).toBe(mountLifeCycleText);
    });

    test(`expects updateLifeCycleText to be ${updateLifeCycleText} after getting unit for the second and more time`, (): void => {
      domContainer.extractUnit({ DomUnitConstructor: DomUnitDemo, properties: {} });

      const { unit: updatedUnit } = domContainer.extractUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: {}
      });
      const domUnit: DomUnitDemo = updatedUnit as DomUnitDemo;
      const { lifeCycleResult } = domUnit.getUpdateLifeCycleResult();

      expect(lifeCycleResult).toBe(updateLifeCycleText);
    });

    test('expects updateTags to be different each times this method is called for the same unit', (): void => {
      const { updateTag } = domContainer.extractUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: {}
      });
      const { updateTag: updatedUnitUpdateTag } = domContainer.extractUnit({
        DomUnitConstructor: DomUnitDemo,
        properties: {}
      });

      expect(updateTag).not.toBe(updatedUnitUpdateTag);
    });
  });
});
