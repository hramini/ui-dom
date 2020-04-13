"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_unit_demo_class_1 = require("../unit/dom-unit-demo-class");
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
        const innerElementTagName = 'innet-test-tag';
        const innerElementInnerHtml = 'testChildInTheP';
        test(`expects an element without properties and children to have a ${elementTagName} tagName and an element with ${domUnitDemoElementTagName} inside`, () => {
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {},
                children: []
            });
            const { tagName } = element;
            const { elementCollection: { length } } = virtual_document_1.VirtualDocument.findElementsByTagName({
                source: element,
                tagName: domUnitDemoElementTagName
            });
            expect(tagName.toLowerCase()).toBe(elementTagName);
            expect(length).toBe(1);
        });
        test(`expects an element with properties and without children to have an attribute with "title" as key and with ${elementTitleAttribute} as value`, () => {
            const { element: { children: { 0: firstElementChild } } } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    title: elementTitleAttribute
                }
            });
            const { isFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: firstElementChild,
                attributeKey: 'title'
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(elementTitleAttribute);
        });
        test(`expects an element with key properties and without children to have an attribute with "title" as key and with ${elementTitleAttribute} as value`, () => {
            const { element: { children: { 0: firstElementChild } } } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    title: elementTitleAttribute,
                    key: 1
                }
            });
            const { isFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: firstElementChild,
                attributeKey: 'title'
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(elementTitleAttribute);
        });
        test(`expects an element without properties and with single children to its innerHTML be ${elementChild}`, () => {
            const { element: { children: { 0: { innerHTML: firstElementChildInnerHtml } } } } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {},
                children: [elementChild]
            });
            expect(firstElementChildInnerHtml).toBe(elementChild);
        });
        test(`expects an element without properties and with array children to its innerHTML be ${elementChild} + another element with ${innerElementTagName} tagName`, () => {
            const { element: childElement } = doc.makeElement({ tagName: innerElementTagName });
            virtual_document_1.VirtualDocument.setInnerHtml({
                source: childElement,
                innerHtml: innerElementInnerHtml
            });
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {},
                children: [elementChild, childElement]
            });
            expect(element.children[0].innerHTML).toBe(`${elementChild}<${innerElementTagName}>${innerElementInnerHtml}</${innerElementTagName}>`);
        });
        test(`expects an element with both properties and children to innerHTML of its children be ${elementChild} and its children attribute value with "title" key be ${elementTitleAttribute}`, () => {
            const { element: { children: { 0: firstElementChild } } } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    title: elementTitleAttribute
                },
                children: [elementChild]
            });
            const { isFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                sourceElement: firstElementChild,
                attributeKey: 'title'
            });
            const { innerHTML: innerHtml } = firstElementChild;
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(elementTitleAttribute);
            expect(innerHtml).toBe(elementChild);
        });
    });
});
