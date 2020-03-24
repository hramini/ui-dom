"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
const dom_unit_demo_class_1 = require("../unit/dom-unit-demo-class");
const dom_frame_builder_class_1 = require("./dom-frame-builder-class");
describe('@DomFrameBuilder', () => {
    let doc;
    let domFrameBuilder;
    beforeAll(() => {
        doc = new ui_wrapper_1.VirtualDocument();
        domFrameBuilder = new dom_frame_builder_class_1.DomFrameBuilder();
    });
    describe('#buildElement', () => {
        test('testing buildElement without properties and children', () => {
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {},
                children: []
            });
            expect(element.tagName.toLowerCase()).toBe('domunitdemo-unit');
            expect(element.getElementsByTagName('dom-unit-demo').length).toBe(1);
        });
        test('testing buildElement with properties and without children', () => {
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    title: 'testTitle'
                },
                children: []
            });
            expect(element.children[0].getAttribute('title')).toBe('testTitle');
        });
        test('testing buildElement with key property and without children', () => {
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    title: 'testTitle',
                    key: 1
                },
                children: []
            });
            expect(element.children[0].getAttribute('title')).toBe('testTitle');
        });
        test('testing buildElement without properties and with single children', () => {
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {},
                children: 'testChild'
            });
            expect(element.children[0].innerHTML).toBe('testChild');
        });
        test('testing buildElement without properties and with array children', () => {
            const { element: childElement } = doc.makeElement({ tagName: 'test-tag' });
            childElement.innerHTML = 'testChildInTheP';
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {},
                children: ['testChild', childElement]
            });
            expect(element.children[0].innerHTML).toBe('testChild<test-tag>testChildInTheP</test-tag>');
        });
        test('testing buildElement with both properties and children', () => {
            const { element } = domFrameBuilder.buildElement({
                name: dom_unit_demo_class_1.DomUnitDemo,
                properties: {
                    title: 'testTitle'
                },
                children: ['testChild']
            });
            expect(element.children[0].getAttribute('title')).toBe('testTitle');
            expect(element.children[0].innerHTML).toBe('testChild');
        });
    });
});
