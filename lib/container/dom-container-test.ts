import { DomUnitDemo } from '../unit/dom-unit-demo-class';
import { DomContainer } from './dom-container-class';

describe('@DomContainer', (): void => {
  let domContainer: DomContainer;
  beforeAll((): void => {
    domContainer = DomContainer.getInstance();
  });

  describe('#getUnit', (): void => {
    /*
     * test('get unit of a dom unit should be defined', (): void => {
     *   const { unit, previousTag } = DomContainerDemo.getUnit({ unit: DomUnitDemo, properties: {} });
     *   expect(unit).toBeDefined();
     *   expect(previousTag).toBe(0);
     * });
     */

    test('check mount life cycle of DomUnitDemo after getting unit', (): void => {
      const { unit } = domContainer.getUnit({ unit: DomUnitDemo, properties: { key: 1 } });
      const domUnit: DomUnitDemo = unit as DomUnitDemo;
      expect(domUnit.getMountLifeCycleResult()).toBe('CBpPAp');
    });

    test('check update life cycle of DomUnitDemo after getting existed unit', (): void => {
      domContainer.getUnit({ unit: DomUnitDemo, properties: {} });
      const { unit: updatedUnit } = domContainer.getUnit({ unit: DomUnitDemo, properties: {} });
      const domUnit: DomUnitDemo = updatedUnit as DomUnitDemo;
      expect(domUnit.getUpdateLifeCycleResult()).toBe('BuPAu');
    });

    test('check update life cycle of DomUnitDemo after getting existed unit', (): void => {
      const { updateTag } = domContainer.getUnit({ unit: DomUnitDemo, properties: {} });
      const { updateTag: updatedUnitUpdateTag } = domContainer.getUnit({
        unit: DomUnitDemo,
        properties: {}
      });
      expect(updateTag).not.toBe(updatedUnitUpdateTag);
    });
  });
});
