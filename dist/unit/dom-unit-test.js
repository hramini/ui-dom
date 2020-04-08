"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_unit_demo_class_1 = require("./dom-unit-demo-class");
const dom_unit_frame_demo_class_1 = require("./dom-unit-frame-demo-class");
describe('@DomUnit', () => {
    describe('#runMountLifeCycle', () => {
        test('testing the unit life cycle for mounting', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            expect(domUnitView.getMountLifeCycleResult()).toBe('CBpPAp');
        });
    });
    describe('#runUpdateLifeCycle', () => {
        test('testing the unit life cycle for updating', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.runUpdateLifeCycle({ properties: {} });
            expect(domUnitView.getUpdateLifeCycleResult()).toBe('BuPAu');
        });
        test('testing the unit life cycle for updating, when onBeforeUpdate does not allow user to update', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.changeOnBeforeUpdateReturn(false);
            domUnitView.runUpdateLifeCycle({ properties: {} });
            expect(domUnitView.getUpdateLifeCycleResult()).toBe('Bu');
        });
        test('testing the updated element after update', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            const { element: beforeElement } = domUnitView.getProvidedView();
            domUnitView.runUpdateLifeCycle({ properties: {} });
            const { element: afterElement } = domUnitView.getProvidedView();
            const beforeElementPreUnitData = beforeElement.getAttribute('pre-unit-data');
            const afterElementPreUnitData = afterElement.getAttribute('pre-unit-data');
            const beforeElementUnitData = beforeElement.getAttribute('unit-data');
            const afterElementUnitData = afterElement.getAttribute('unit-data');
            expect(beforeElementPreUnitData).toBeNull();
            expect(beforeElementUnitData).toBeNull();
            expect(afterElementPreUnitData).toBeNull();
            expect(afterElementUnitData).toBeNull();
        });
        test('element could not be found in DOM because it is not appended', () => {
            const domUnitFrameDemo = new dom_unit_frame_demo_class_1.DomUnitFrameDemo();
            domUnitFrameDemo.runMountLifeCycle({
                properties: {}
            });
            const { element: beforeElement } = domUnitFrameDemo.getProvidedView();
            const { tagName: beforeElementTagName } = beforeElement;
            domUnitFrameDemo.runUpdateLifeCycle({ properties: {} });
            const { element: afterElement } = domUnitFrameDemo.getProvidedView();
            const virtualDocument = new virtual_document_1.VirtualDocument({ doc: document });
            const { attributeValue: beforeElementPreUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: beforeElement,
                attributeKey: 'pre-unit-data'
            });
            const { isFound: isElementInDocBeforeUpdateFound } = virtualDocument.findFirstElementByQuery({
                query: `${beforeElementTagName.toLowerCase()}[unit-data="${beforeElementPreUnitData}"]`
            });
            const { attributeValue: afterElementPreUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: beforeElement,
                attributeKey: 'pre-unit-data'
            });
            const { isFound: isElementInDocAfterUpdateFound } = virtualDocument.findFirstElementByQuery({
                query: `${afterElement.tagName.toLowerCase()}[unit-data="${afterElementPreUnitData}"]`
            });
            expect(isElementInDocBeforeUpdateFound).toBeFalsy();
            expect(isElementInDocAfterUpdateFound).toBeFalsy();
        });
        test('element could be found in DOM because it is appended with changed unit-data after unit update', () => {
            const domUnitFrameDemo = new dom_unit_frame_demo_class_1.DomUnitFrameDemo();
            domUnitFrameDemo.runMountLifeCycle({
                properties: {}
            });
            const { element: beforeElement } = domUnitFrameDemo.getProvidedView();
            document.body.append(beforeElement);
            domUnitFrameDemo.runUpdateLifeCycle({ properties: {} });
            const { element: afterElement } = domUnitFrameDemo.getProvidedView();
            const { attributeValue: beforeElementPreUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: beforeElement,
                attributeKey: 'pre-unit-data'
            });
            const { attributeValue: afterElementPreUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: afterElement,
                attributeKey: 'pre-unit-data'
            });
            const { attributeValue: beforeElementUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: beforeElement,
                attributeKey: 'unit-data'
            });
            const { attributeValue: afterElementUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: afterElement,
                attributeKey: 'unit-data'
            });
            expect(beforeElementPreUnitData).not.toEqual(afterElementPreUnitData);
            expect(beforeElementUnitData).not.toEqual(afterElementUnitData);
            expect(beforeElementUnitData).toEqual(afterElementPreUnitData);
        });
    });
    describe('#runDisposeLifeCycle', () => {
        test('testing the unit life cycle for disposing', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runDisposeLifeCycle();
            expect(domUnitView.getDisposeLifeCycleResult()).toBe('Bd');
        });
    });
    describe('#getProvidedView', () => {
        test('get provided view before running mount life cycle', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            const { element } = domUnitView.getProvidedView();
            expect(element).toBeUndefined();
        });
        test('get provided view after running mount life cycle', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({ properties: {} });
            const { element } = domUnitView.getProvidedView();
            expect(element.tagName.toLowerCase()).toBe('dom-unit-demo');
        });
    });
    describe('#forceUpdate', () => {
        test('testing force update', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.forceUpdate();
            expect(domUnitView.getUpdateLifeCycleResult()).toBe('BuPAu');
        });
    });
    describe('#alterState', () => {
        test('testing state object after alter state', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.alterState({ state: { testState: 'changed' } });
            const { state } = domUnitView.getState();
            expect(state.testState).toBe('changed');
            expect(domUnitView.getUpdateLifeCycleResult()).toBe('BuPAu');
        });
        test('testing alter state with callback', () => {
            let testForCallback = '';
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.alterState({
                state: { testState: 'changed' },
                callbackFunction: () => {
                    testForCallback = 'modified';
                }
            });
            expect(testForCallback).toBe('modified');
        });
    });
});
