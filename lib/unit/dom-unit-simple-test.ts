import { DomUnitSimpleDemo } from './dom-unit-simple-demo-class';

describe('@DomUnit / no override', () => {
  describe('#runMountLifeCycle', () => {
    test('testing the unit life cycle for mounting', () => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      expect(domUnitView.getMountLifeCycleResult()).toBe('CP');
    });
  });

  describe('#runUpdateLifeCycle', () => {
    test('testing the unit life cycle for updating', () => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.runUpdateLifeCycle({ properties: {} });
      expect(domUnitView.getUpdateLifeCycleResult()).toBe('PP');
    });
  });

  describe('#runDisposeLifeCycle', () => {
    test('testing the unit life cycle for disposing', () => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runDisposeLifeCycle();
      expect(domUnitView.getDisposeLifeCycleResult()).toBe('');
    });
  });
});
