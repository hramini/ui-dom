import { DomUnitSimpleDemo } from './dom-unit-simple-demo-class';

describe('@DomUnit / no override', (): void => {
  describe('#runMountLifeCycle', (): void => {
    test('testing the unit life cycle for mounting', (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      expect(domUnitView.getMountLifeCycleResult()).toBe('CP');
    });
  });

  describe('#runUpdateLifeCycle', (): void => {
    test('testing the unit life cycle for updating', (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.runUpdateLifeCycle({ properties: {} });
      expect(domUnitView.getUpdateLifeCycleResult()).toBe('PP');
    });
  });

  describe('#runDisposeLifeCycle', (): void => {
    test('testing the unit life cycle for disposing', (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runDisposeLifeCycle();
      expect(domUnitView.getDisposeLifeCycleResult()).toBe('');
    });
  });
});
