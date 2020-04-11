"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_tag_builder_class_1 = require("./dom-tag-builder-class");
describe('@DomTagBuilder', () => {
    let domTagBuilder;
    beforeAll(() => {
        domTagBuilder = new dom_tag_builder_class_1.DomTagBuilder();
    });
    describe('#buildElement', () => {
        test('testing buildElement without properties and children', () => {
            const { element } = domTagBuilder.buildElement({
                name: 'dom-tag-builder-test',
                properties: {},
                children: []
            });
            expect(element.tagName.toLowerCase()).toBe('dom-tag-builder-test');
        });
        test('testing buildElement with simple properties and without children', () => {
            const { element } = domTagBuilder.buildElement({
                name: 'dom-tag-builder-test',
                properties: {
                    name: 'test-title-attr'
                },
                children: []
            });
            expect(element.getAttribute('name')).toBe('test-title-attr');
        });
        test('testing buildElement with eventListener properties and without children', () => {
            let test = 'beforeClickText';
            const { element } = domTagBuilder.buildElement({
                name: 'dom-tag-builder-test',
                properties: {
                    onClick: () => {
                        test = 'afterClickText';
                    }
                },
                children: []
            });
            element.click();
            expect(test).toBe('afterClickText');
        });
        test('testing buildElement without properties and with simple string children', () => {
            const { element } = domTagBuilder.buildElement({
                name: 'dom-tag-builder-test',
                properties: {},
                children: ['children-string-test']
            });
            expect(element.innerHTML).toBe('children-string-test');
        });
        test('testing buildElement without properties and with element children', () => {
            const { element: childElement } = domTagBuilder.buildElement({
                name: 'dom-tag-child',
                properties: {},
                children: []
            });
            const { element: { children: { 0: { tagName } } } } = domTagBuilder.buildElement({
                name: 'dom-tag-builder-test',
                properties: {},
                children: [childElement]
            });
            expect(tagName.toLowerCase()).toBe('dom-tag-child');
        });
        test('testing buildElement without properties and with array of children', () => {
            const { element } = domTagBuilder.buildElement({
                name: 'dom-tag-builder-test',
                properties: {},
                children: ['firstChild', '-', 'secondChild']
            });
            expect(element.innerHTML).toBe('firstChild-secondChild');
        });
        test('testing buildElement with both properties and children', () => {
            const { element } = domTagBuilder.buildElement({
                name: 'dom-tag',
                properties: {
                    name: 'domTag'
                },
                children: ['dom-tag-inner-text']
            });
            expect(element.outerHTML).toBe('<dom-tag name="domTag">dom-tag-inner-text</dom-tag>');
        });
        test('expects children properties does not add to element attributes', () => {
            const { element } = domTagBuilder.buildElement({
                name: 'dom-tag',
                properties: {
                    children: ['domTag']
                }
            });
            expect(element.getAttribute('children')).toBeNull();
            expect(element.innerHTML).toBe('domTag');
        });
    });
});
