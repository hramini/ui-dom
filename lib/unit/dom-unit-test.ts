/* eslint-disable max-lines */
import { VirtualDocument } from 'virtual-document';
import { DomUnitDemo } from './dom-unit-demo-class';
import { DomUnitFrameDemo } from './dom-unit-frame-demo-class';

describe('@DomUnit', (): void => {
  describe('#runMountLifeCycle', (): void => {
    const mountLifeCycleText: string = 'CBpPAp';

    test(`expects mountLifeCycleResult to be ${mountLifeCycleText}`, (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });

      expect(domUnitView.getMountLifeCycleResult()).toBe(mountLifeCycleText);
    });
  });

  describe('#runUpdateLifeCycle', (): void => {
    const updateLifeCycleText: string = 'BuPAu';
    const shouldNotUpdateLifeCycleText: string = 'Bu';

    test(`expects updateLifeCycleResult to be ${updateLifeCycleText}`, (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.runUpdateLifeCycle({ properties: {} });

      expect(domUnitView.getUpdateLifeCycleResult()).toBe(updateLifeCycleText);
    });

    test(`expects updateLifeCycleResult to be ${shouldNotUpdateLifeCycleText} when #onBeforeUpdate return value is "false"`, (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.changeOnBeforeUpdateReturn(false);
      domUnitView.runUpdateLifeCycle({ properties: {} });

      expect(domUnitView.getUpdateLifeCycleResult()).toBe(shouldNotUpdateLifeCycleText);
    });

    test('expects all element unit data to be null', (): void => {
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

    test('expects element could not be found in DOM because it is not appended', (): void => {
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

    test('expects element could be found in DOM because it is appended with changed unit-data after unit update', (): void => {
      const domUnitFrameDemo: DomUnitFrameDemo = new DomUnitFrameDemo();
      const virtualDocument: VirtualDocument = new VirtualDocument({ doc: document });
      domUnitFrameDemo.runMountLifeCycle({
        properties: {}
      });
      const { element: beforeElement } = domUnitFrameDemo.getProvidedView();
      const {
        elementCollection: { 0: bodyElement }
      } = virtualDocument.findElementsByTagNameInDoc({
        tagName: 'body'
      });
      VirtualDocument.append({ source: bodyElement as HTMLElement, element: beforeElement });
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
    const disposeLifeCycleText: string = 'Bd';

    test(`expects disposeLifeCycleResult to be ${disposeLifeCycleText}`, (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runDisposeLifeCycle();

      expect(domUnitView.getDisposeLifeCycleResult()).toBe(disposeLifeCycleText);
    });
  });

  describe('#getProvidedView', (): void => {
    const domUnitTagName: string = 'dom-unit-demo';

    test('expects provided view to be undefined before running mount life cycle', (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      const { element } = domUnitView.getProvidedView();

      expect(element).toBeUndefined();
    });

    test(`expects the return value of provided view to be an element with "${domUnitTagName}" after running mount life cycle`, (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({ properties: {} });
      const {
        element: { tagName: elementTagName }
      } = domUnitView.getProvidedView();

      expect(elementTagName.toLowerCase()).toBe(domUnitTagName);
    });
  });

  describe('#forceUpdate', (): void => {
    const updateLifeCycleText: string = 'BuPAu';

    test(`expects updateLifeCycleResult to be ${updateLifeCycleText}`, (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.forceUpdate();

      expect(domUnitView.getUpdateLifeCycleResult()).toBe(updateLifeCycleText);
    });
  });

  describe('#alterState', (): void => {
    const updateLifeCycleText: string = 'BuPAu';
    const testStateText: string = 'changed';
    const callbackText: string = 'modified';

    test(`expects updateLifeCycleResult to be ${updateLifeCycleText} and "testState" of state object to be "${testStateText}"`, (): void => {
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.alterState({ state: { testState: testStateText } });
      const {
        state: { testState }
      } = domUnitView.getState();

      expect(testState).toBe(testStateText);
      expect(domUnitView.getUpdateLifeCycleResult()).toBe(updateLifeCycleText);
    });

    test('expects callbackFunction to change the text properly', (): void => {
      let testForCallback: string = '';
      const domUnitView: DomUnitDemo = new DomUnitDemo();
      domUnitView.runMountLifeCycle({
        properties: {}
      });
      domUnitView.alterState({
        state: { testState: testStateText },
        callbackFunction: (): void => {
          testForCallback = callbackText;
        }
      });
      const {
        state: { testState }
      } = domUnitView.getState();

      expect(testState).toBe(testStateText);
      expect(testForCallback).toBe(callbackText);
    });
  });
});
