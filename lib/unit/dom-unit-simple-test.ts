import { DomUnitSimpleDemo } from './dom-unit-simple-demo-class';

describe('@DomUnit / no override', (): void => {
  describe('#runMountLifeCycle', (): void => {
    const mountLifeCycleText: string = 'CP';

    test(`expects mountLifeCycleResult to be ${mountLifeCycleText}`, (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();

      domUnitView.runMountLifeCycle({
        properties: {}
      });

      const { lifeCycleResult } = domUnitView.getMountLifeCycleResult();

      expect(lifeCycleResult).toBe(mountLifeCycleText);
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

      const { lifeCycleResult } = domUnitView.getUpdateLifeCycleResult();

      expect(lifeCycleResult).toBe(updateLifeCycleText);
    });
  });

  describe('#runDisposeLifeCycle', (): void => {
    const disposeLifeCycleText: string = '';

    test(`expects disposeLifeCycleResult to be ${disposeLifeCycleText}`, (): void => {
      const domUnitView: DomUnitSimpleDemo = new DomUnitSimpleDemo();

      domUnitView.runDisposeLifeCycle();

      const { lifeCycleResult } = domUnitView.getDisposeLifeCycleResult();

      expect(lifeCycleResult).toBe(disposeLifeCycleText);
    });
  });
});
