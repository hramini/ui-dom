import { DomUnitDemo } from '../unit/dom-unit-demo-class';
import { DomContainerDemo } from './dom-container-demo-class';

describe('@DomContainer', () => {
  describe('#getUnit', () => {
    test('get unit of a dom unit should be defined', () => {
      DomContainerDemo.flushInstance({ name: DomUnitDemo.name });
      const { unit, previousTag } = DomContainerDemo.getUnit({ unit: DomUnitDemo, properties: {} });
      expect(unit).toBeDefined();
      expect(previousTag).toBe(0);
    });

    test('check mount life cycle of DomUnitDemo after getting unit', () => {
      DomContainerDemo.flushInstance({ name: DomUnitDemo.name });
      const { unit } = DomContainerDemo.getUnit({ unit: DomUnitDemo, properties: { key: 1 } });
      const domUnit: DomUnitDemo = unit as DomUnitDemo;
      expect(domUnit.getMountLifeCycleResult()).toBe('CBpPAp');
    });

    test('check update life cycle of DomUnitDemo after getting existed unit', () => {
      DomContainerDemo.getUnit({ unit: DomUnitDemo, properties: {} });
      const { unit: updatedUnit } = DomContainerDemo.getUnit({ unit: DomUnitDemo, properties: {} });
      const domUnit: DomUnitDemo = updatedUnit as DomUnitDemo;
      expect(domUnit.getUpdateLifeCycleResult()).toBe('BuPAu');
    });

    test('check update life cycle of DomUnitDemo after getting existed unit', () => {
      const { updateTag } = DomContainerDemo.getUnit({ unit: DomUnitDemo, properties: {} });
      const { updateTag: updatedUnitUpdateTag } = DomContainerDemo.getUnit({
        unit: DomUnitDemo,
        properties: {}
      });
      expect(updateTag).not.toBe(updatedUnitUpdateTag);
    });
  });
});
