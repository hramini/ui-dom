"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_tag_builder_class_1 = require("./dom-tag-builder-class");
describe('@DomTagBuilder', () => {
    let domTagBuilder;
    beforeAll(() => {
        domTagBuilder = new dom_tag_builder_class_1.DomTagBuilder();
    });
    describe('#buildElement', () => {
        const domTagName = 'dom-tag-builder-test';
        const nameAttribute = 'test-title-attr';
        const elementInnerHtmlText = 'children-string-test';
        const elementInnerHtmlTextFirst = 'children-string-test-first';
        const elementInnerHtmlTextSecond = 'children-string-test-second';
        test(`expects to build an element without properties and children having ${domTagName} as tagName`, () => {
            const { element: { tagName: elementTagName } } = domTagBuilder.buildElement({
                name: domTagName,
                properties: {}
            });
            expect(elementTagName.toLowerCase()).toBe(domTagName);
        });
        test(`expects to build an element with simple properties and without children having "${nameAttribute}" as an attribute with "name" key`, () => {
            const { element } = domTagBuilder.buildElement({
                name: domTagName,
                properties: {
                    name: nameAttribute
                }
            });
            const { isFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'name',
                element
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(nameAttribute);
        });
        test('expects to build an element with eventListener properties and without children having a click event listener', () => {
            const afterText = 'afterClickText';
            let testText = 'beforeClickText';
            const { element } = domTagBuilder.buildElement({
                name: domTagName,
                properties: {
                    onClick: () => {
                        testText = afterText;
                    }
                }
            });
            element.click();
            expect(testText).toBe(afterText);
        });
        test(`expects to build an element without properties and with simple children having "${elementInnerHtmlText}" as inner html of element`, () => {
            const { element: { innerHTML: elementInnerHtml } } = domTagBuilder.buildElement({
                children: [elementInnerHtmlText],
                name: domTagName,
                properties: {}
            });
            expect(elementInnerHtml).toBe(elementInnerHtmlText);
        });
        test(`expects to build an element without properties and with element children having an element in its children with "${domTagName}" tagName`, () => {
            const { element: childElement } = domTagBuilder.buildElement({
                children: [],
                name: domTagName,
                properties: {}
            });
            const { element: { children: { 0: { tagName } } } } = domTagBuilder.buildElement({
                children: [childElement],
                name: 'dom-tag-parent',
                properties: {}
            });
            expect(tagName.toLowerCase()).toBe(domTagName);
        });
        test(`expects to build an element without properties and with simple children having "${elementInnerHtmlTextFirst}-${elementInnerHtmlTextSecond}" as inner html of element`, () => {
            const { element: { innerHTML: elementInnerHtml } } = domTagBuilder.buildElement({
                children: [elementInnerHtmlTextFirst, '-', elementInnerHtmlTextSecond],
                name: domTagName,
                properties: {}
            });
            expect(elementInnerHtml).toBe(`${elementInnerHtmlTextFirst}-${elementInnerHtmlTextSecond}`);
        });
        test(`expects to build an element with both properties and children having "${nameAttribute}" as an attribute with "name" key and "${elementInnerHtmlText}" as inner html of element`, () => {
            const { element } = domTagBuilder.buildElement({
                children: [elementInnerHtmlText],
                name: domTagName,
                properties: {
                    name: nameAttribute
                }
            });
            const { tagName: elementTagName, innerHTML: elementInnerHtml } = element;
            const { isFound, attributeValue: nameAttributeValue } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'name',
                element
            });
            expect(elementTagName.toLowerCase()).toBe(domTagName);
            expect(elementInnerHtml).toBe(elementInnerHtmlText);
            expect(isFound).toBeTruthy();
            expect(nameAttributeValue).toBe(nameAttribute);
        });
        test(`expects to build an element with children property and without children do not having any attribute with "children" key and "${elementInnerHtmlText}" as inner html of element`, () => {
            const { element } = domTagBuilder.buildElement({
                name: domTagName,
                properties: {
                    children: [elementInnerHtmlText]
                }
            });
            const { isFound } = virtual_document_1.VirtualDocument.findAttribute({
                attributeKey: 'children',
                element
            });
            const { innerHTML: elementInnerHtml } = element;
            expect(isFound).toBeFalsy();
            expect(elementInnerHtml).toBe(elementInnerHtmlText);
        });
    });
});
