"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_unit_demo_class_1 = require("./dom-unit-demo-class");
const dom_unit_frame_demo_class_1 = require("./dom-unit-frame-demo-class");
describe('@DomUnit', () => {
    describe('#runMountLifeCycle', () => {
        const mountLifeCycleText = 'CBpPAp';
        test(`expects mountLifeCycleResult to be ${mountLifeCycleText}`, () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            const { lifeCycleResult } = domUnitView.getMountLifeCycleResult();
            expect(lifeCycleResult).toBe(mountLifeCycleText);
        });
    });
    describe('#runUpdateLifeCycle', () => {
        const updateLifeCycleText = 'BuPAu';
        const shouldNotUpdateLifeCycleText = 'Bu';
        test(`expects updateLifeCycleResult to be ${updateLifeCycleText}`, () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.runUpdateLifeCycle({ properties: {} });
            const { lifeCycleResult } = domUnitView.getUpdateLifeCycleResult();
            expect(lifeCycleResult).toBe(updateLifeCycleText);
        });
        test(`expects updateLifeCycleResult to be ${shouldNotUpdateLifeCycleText} when #onBeforeUpdate return value is "false"`, () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.setOnBeforeUpdateReturn({ value: false });
            domUnitView.runUpdateLifeCycle({ properties: {} });
            const { lifeCycleResult } = domUnitView.getUpdateLifeCycleResult();
            expect(lifeCycleResult).toBe(shouldNotUpdateLifeCycleText);
        });
        test('expects all element unit data to be null', () => {
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
        test('expects element could not be found in DOM because it is not appended', () => {
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
                attributeKey: 'pre-unit-data',
                element: beforeElement
            });
            const { isFound: isElementInDocBeforeUpdateFound } = virtualDocument.findFirstElementByQuery({
                query: `${beforeElementTagName.toLowerCase()}[unit-data="${beforeElementPreUnitData}"]`
            });
            const { attributeValue: afterElementPreUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'pre-unit-data',
                element: beforeElement
            });
            const { isFound: isElementInDocAfterUpdateFound } = virtualDocument.findFirstElementByQuery({
                query: `${afterElement.tagName.toLowerCase()}[unit-data="${afterElementPreUnitData}"]`
            });
            expect(isElementInDocBeforeUpdateFound).toBeFalsy();
            expect(isElementInDocAfterUpdateFound).toBeFalsy();
        });
        test('expects element could be found in DOM because it is appended with changed unit-data after unit update', () => {
            const domUnitFrameDemo = new dom_unit_frame_demo_class_1.DomUnitFrameDemo();
            const virtualDocument = new virtual_document_1.VirtualDocument({ doc: document });
            domUnitFrameDemo.runMountLifeCycle({
                properties: {}
            });
            const { element: beforeElement } = domUnitFrameDemo.getProvidedView();
            const { elementCollection } = virtualDocument.findElementsByTagNameInDoc({
                tagName: 'body'
            });
            const { 0: bodyElement } = elementCollection;
            virtual_document_1.VirtualDocument.append({ appendTo: bodyElement, element: beforeElement });
            domUnitFrameDemo.runUpdateLifeCycle({ properties: {} });
            const { element: afterElement } = domUnitFrameDemo.getProvidedView();
            const { attributeValue: beforeElementPreUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'pre-unit-data',
                element: beforeElement
            });
            const { attributeValue: afterElementPreUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'pre-unit-data',
                element: afterElement
            });
            const { attributeValue: beforeElementUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'unit-data',
                element: beforeElement
            });
            const { attributeValue: afterElementUnitData } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'unit-data',
                element: afterElement
            });
            expect(beforeElementPreUnitData).not.toEqual(afterElementPreUnitData);
            expect(beforeElementUnitData).not.toEqual(afterElementUnitData);
            expect(beforeElementUnitData).toEqual(afterElementPreUnitData);
        });
    });
    describe('#runDisposeLifeCycle', () => {
        const disposeLifeCycleText = 'Bd';
        test(`expects disposeLifeCycleResult to be ${disposeLifeCycleText}`, () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runDisposeLifeCycle();
            const { lifeCycleResult } = domUnitView.getDisposeLifeCycleResult();
            expect(lifeCycleResult).toBe(disposeLifeCycleText);
        });
    });
    describe('#getProvidedView', () => {
        const domUnitTagName = 'dom-unit-demo';
        test('expects provided view to be undefined before running mount life cycle', () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            const { element } = domUnitView.getProvidedView();
            expect(element).toBeUndefined();
        });
        test(`expects the return value of provided view to be an element with "${domUnitTagName}" after running mount life cycle`, () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({ properties: {} });
            const { element } = domUnitView.getProvidedView();
            const { tagName: elementTagName } = element;
            expect(elementTagName.toLowerCase()).toBe(domUnitTagName);
        });
    });
    describe('#forceUpdate', () => {
        const updateLifeCycleText = 'BuPAu';
        test(`expects updateLifeCycleResult to be ${updateLifeCycleText}`, () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.forceUpdate();
            const { lifeCycleResult } = domUnitView.getUpdateLifeCycleResult();
            expect(lifeCycleResult).toBe(updateLifeCycleText);
        });
    });
    describe('#alterState', () => {
        const updateLifeCycleText = 'BuPAu';
        const testStateText = 'changed';
        const callbackText = 'modified';
        test(`expects updateLifeCycleResult to be ${updateLifeCycleText} and "testState" of state object to be "${testStateText}"`, () => {
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.alterState({ state: { testState: testStateText } });
            const { state } = domUnitView.getState();
            const { testState } = state;
            const { lifeCycleResult } = domUnitView.getUpdateLifeCycleResult();
            expect(testState).toBe(testStateText);
            expect(lifeCycleResult).toBe(updateLifeCycleText);
        });
        test('expects callbackFunction to change the text properly', () => {
            let testForCallback = '';
            const domUnitView = new dom_unit_demo_class_1.DomUnitDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.alterState({
                callbackFunction: () => {
                    testForCallback = callbackText;
                },
                state: { testState: testStateText }
            });
            const { state } = domUnitView.getState();
            const { testState } = state;
            expect(testState).toBe(testStateText);
            expect(testForCallback).toBe(callbackText);
        });
    });
});
