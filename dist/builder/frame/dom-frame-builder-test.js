"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_unit_demo_class_1 = require("../../unit/dom-unit-demo-class");
const dom_frame_builder_class_1 = require("./dom-frame-builder-class");
describe('@DomFrameBuilder', () => {
    let doc;
    let domFrameBuilder;
    beforeAll(() => {
        doc = new virtual_document_1.VirtualDocument();
        domFrameBuilder = new dom_frame_builder_class_1.DomFrameBuilder();
    });
    describe('#buildElement', () => {
        const elementTagName = 'domunitdemo-unit';
        const domUnitDemoElementTagName = 'dom-unit-demo';
        const elementTitleAttribute = 'testTitle';
        const elementChild = 'testChild';
        const innerElementTagName = 'inner-test-tag';
        const innerElementInnerHtml = 'testChildInTheP';
        test(`expects an element without properties and children to have a ${elementTagName} tagName and an element with ${domUnitDemoElementTagName} inside`, () => {
            const { element } = domFrameBuilder.buildElement({
                UnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                properties: {}
            });
            const { tagName } = element;
            const { elementCollection: { length } } = virtual_document_1.VirtualDocument.findElementsByTagName({
                element,
                tagName: domUnitDemoElementTagName
            });
            expect(tagName.toLowerCase()).toBe(elementTagName);
            expect(length).toBe(1);
        });
        test(`expects an element with properties and without children to have an attribute with "title" as key and with ${elementTitleAttribute} as value`, () => {
            const { element: { children: { 0: firstElementChild } } } = domFrameBuilder.buildElement({
                UnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    title: elementTitleAttribute
                }
            });
            const { isFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'title',
                element: firstElementChild
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(elementTitleAttribute);
        });
        test(`expects an element with key properties and without children to have an attribute with "title" as key and with ${elementTitleAttribute} as value`, () => {
            const { element: { children: { 0: firstElementChild } } } = domFrameBuilder.buildElement({
                UnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    key: 1,
                    title: elementTitleAttribute
                }
            });
            const { isFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'title',
                element: firstElementChild
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(elementTitleAttribute);
        });
        test(`expects an element without properties and with single children to its innerHTML be ${elementChild}`, () => {
            const { element: { children: { 0: { innerHTML: firstElementChildInnerHtml } } } } = domFrameBuilder.buildElement({
                UnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                children: [elementChild],
                properties: {}
            });
            expect(firstElementChildInnerHtml).toBe(elementChild);
        });
        test(`expects an element without properties and with array children to its innerHTML be ${elementChild} + another element with ${innerElementTagName} tagName`, () => {
            const { element: childElement } = doc.createNewElement({ tagName: innerElementTagName });
            virtual_document_1.VirtualDocument.setInnerHtml({
                element: childElement,
                innerHtml: innerElementInnerHtml
            });
            const { element } = domFrameBuilder.buildElement({
                UnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                children: [elementChild, childElement],
                properties: {}
            });
            expect(element.children[0].innerHTML).toBe(`${elementChild}<${innerElementTagName}>${innerElementInnerHtml}</${innerElementTagName}>`);
        });
        test(`expects an element with both properties and children to innerHTML of its children be ${elementChild} and its children attribute value with "title" key be ${elementTitleAttribute}`, () => {
            const { element: { children: { 0: firstElementChild } } } = domFrameBuilder.buildElement({
                UnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                children: [elementChild],
                properties: {
                    title: elementTitleAttribute
                }
            });
            const { isFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'title',
                element: firstElementChild
            });
            const { innerHTML: innerHtml } = firstElementChild;
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(elementTitleAttribute);
            expect(innerHtml).toBe(elementChild);
        });
    });
});
