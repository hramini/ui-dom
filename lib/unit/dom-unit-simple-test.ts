import { DomUnitSimpleDemo } from './dom-unit-simple-demo-class';

describe('@DomUnit / no override', (): void => {
  describe('#runMountLifeCycle', (): void => {
    const mountLifeCycleText: string = 'CP';

    test(`expects mountLifeCycleResult to be ${mountLifeCycleText}`, (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });

      expect(domUnitView.getMountLifeCycleResult()).toBe(mountLifeCycleText);
    });
  });

  describe('#runUpdateLifeCycle', (): void => {
    const updateLifeCycleText: string = 'PP';

    test(`expects updateLifeCycleResult to be ${updateLifeCycleText}`, (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.runUpdateLifeCycle({ properties: {} });

      expect(domUnitView.getUpdateLifeCycleResult()).toBe(updateLifeCycleText);
    });
  });

  describe('#runDisposeLifeCycle', (): void => {
    const disposeLifeCycleText: string = '';

    test(`expects disposeLifeCycleResult to be ${disposeLifeCycleText}`, (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();
      domUnitView.runDisposeLifeCycle();

      expect(domUnitView.getDisposeLifeCycleResult()).toBe(disposeLifeCycleText);
    });
  });
});
