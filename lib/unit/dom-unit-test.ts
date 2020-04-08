/* eslint-disable max-lines */
import { VirtualDocument } from 'virtual-document';
import { DomUnitDemo } from './dom-unit-demo-class';
import { DomUnitFrameDemo } from './dom-unit-frame-demo-class';

describe('@DomUnit', (): void => {
  describe('#runMountLifeCycle', (): void => {
    test('testing the unit life cycle for mounting', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      expect(domUnitView.getMountLifeCycleResult()).toBe('CBpPAp');
    });
  });

  describe('#runUpdateLifeCycle', (): void => {
    test('testing the unit life cycle for updating', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.runUpdateLifeCycle({ properties: {} });
      expect(domUnitView.getUpdateLifeCycleResult()).toBe('BuPAu');
    });

    test('testing the unit life cycle for updating, when onBeforeUpdate does not allow user to update', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.changeOnBeforeUpdateReturn(false);
      domUnitView.runUpdateLifeCycle({ properties: {} });
      expect(domUnitView.getUpdateLifeCycleResult()).toBe('Bu');
    });

    test('testing the updated element after update', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      const { element: beforeElement } = domUnitView.getProvidedView();
      domUnitView.runUpdateLifeCycle({ properties: {} });
      const { element: afterElement } = domUnitView.getProvidedView();
      const beforeElementPreUnitData: string | null = beforeElement.getAttribute('pre-unit-data');
      const afterElementPreUnitData: string | null = afterElement.getAttribute('pre-unit-data');
      const beforeElementUnitData: string | null = beforeElement.getAttribute('unit-data');
      const afterElementUnitData: string | null = afterElement.getAttribute('unit-data');

      expect(beforeElementPreUnitData).toBeNull();
      expect(beforeElementUnitData).toBeNull();
      expect(afterElementPreUnitData).toBeNull();
      expect(afterElementUnitData).toBeNull();
    });

    test('element could not be found in DOM because it is not appended', (): void => {
      const domUnitFrameDemo: DomUnitFrameDemo = new DomUnitFrameDemo();
      domUnitFrameDemo.runMountLifeCycle({
        properties: {}
      });
      const { element: beforeElement } = domUnitFrameDemo.getProvidedView();
      const { tagName: beforeElementTagName } = beforeElement;
      domUnitFrameDemo.runUpdateLifeCycle({ properties: {} });
      const { element: afterElement } = domUnitFrameDemo.getProvidedView();
      const virtualDocument: VirtualDocument = new VirtualDocument({ doc: document });
      const { attributeValue: beforeElementPreUnitData } = VirtualDocument.findAttribute({
        sourceElement: beforeElement,
        attributeKey: 'pre-unit-data'
      });
      const { isFound: isElementInDocBeforeUpdateFound } = virtualDocument.findFirstElementByQuery({
        query: `${beforeElementTagName.toLowerCase()}[unit-data="${beforeElementPreUnitData}"]`
      });
      const { attributeValue: afterElementPreUnitData } = VirtualDocument.findAttribute({
        sourceElement: beforeElement,
        attributeKey: 'pre-unit-data'
      });
      const { isFound: isElementInDocAfterUpdateFound } = virtualDocument.findFirstElementByQuery({
        query: `${afterElement.tagName.toLowerCase()}[unit-data="${afterElementPreUnitData}"]`
      });

      expect(isElementInDocBeforeUpdateFound).toBeFalsy();
      expect(isElementInDocAfterUpdateFound).toBeFalsy();
    });

    test('element could be found in DOM because it is appended with changed unit-data after unit update', (): void => {
      const domUnitFrameDemo: DomUnitFrameDemo = new DomUnitFrameDemo();
      domUnitFrameDemo.runMountLifeCycle({
        properties: {}
      });
      const { element: beforeElement } = domUnitFrameDemo.getProvidedView();
      document.body.append(beforeElement);
      domUnitFrameDemo.runUpdateLifeCycle({ properties: {} });
      const { element: afterElement } = domUnitFrameDemo.getProvidedView();
      const { attributeValue: beforeElementPreUnitData } = VirtualDocument.findAttribute({
        sourceElement: beforeElement,
        attributeKey: 'pre-unit-data'
      });
      const { attributeValue: afterElementPreUnitData } = VirtualDocument.findAttribute({
        sourceElement: afterElement,
        attributeKey: 'pre-unit-data'
      });
      const { attributeValue: beforeElementUnitData } = VirtualDocument.findAttribute({
        sourceElement: beforeElement,
        attributeKey: 'unit-data'
      });
      const { attributeValue: afterElementUnitData } = VirtualDocument.findAttribute({
        sourceElement: afterElement,
        attributeKey: 'unit-data'
      });

      expect(beforeElementPreUnitData).not.toEqual(afterElementPreUnitData);
      expect(beforeElementUnitData).not.toEqual(afterElementUnitData);
      expect(beforeElementUnitData).toEqual(afterElementPreUnitData);
    });
  });

  describe('#runDisposeLifeCycle', (): void => {
    test('testing the unit life cycle for disposing', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runDisposeLifeCycle();
      expect(domUnitView.getDisposeLifeCycleResult()).toBe('Bd');
    });
  });

  describe('#getProvidedView', (): void => {
    test('get provided view before running mount life cycle', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      const { element } = domUnitView.getProvidedView();
      expect(element).toBeUndefined();
    });

    test('get provided view after running mount life cycle', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({ properties: {} });
      const { element } = domUnitView.getProvidedView();
      expect(element.tagName.toLowerCase()).toBe('dom-unit-demo');
    });
  });

  describe('#forceUpdate', (): void => {
    test('testing force update', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.forceUpdate();
      expect(domUnitView.getUpdateLifeCycleResult()).toBe('BuPAu');
    });
  });

  describe('#alterState', (): void => {
    test('testing state object after alter state', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.alterState({ state: { testState: 'changed' } });
      const { state } = domUnitView.getState();
      expect(state.testState).toBe('changed');
      expect(domUnitView.getUpdateLifeCycleResult()).toBe('BuPAu');
    });

    test('testing alter state with callback', (): void => {
      let testForCallback: string = '';
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.alterState({
        state: { testState: 'changed' },
        callbackFunction: (): void => {
          testForCallback = 'modified';
        }
      });

      expect(testForCallback).toBe('modified');
    });
  });
});
