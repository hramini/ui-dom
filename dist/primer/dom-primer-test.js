"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
const dom_primer_class_1 = require("./dom-primer-class");
describe('@DomPrimer', () => {
    let doc;
    let domPrimer;
    beforeAll(() => {
        doc = new ui_wrapper_1.VirtualDocument();
        doc.createBase();
        domPrimer = new dom_primer_class_1.DomPrimer();
    });
    describe('#start', () => {
        beforeAll(() => {
            const { element } = doc.makeElement({ tagName: 'dom-tag' });
            element.id = 'dom_element';
            const { element: target } = doc.findElementById({ id: 'root' });
            domPrimer.start({
                element,
                target
            });
        });
        test('testing the result of start method, by finding id', () => {
            const { element } = doc.findElementById({ id: 'dom_element' });
            expect(element.tagName).toBe('dom-tag');
        });
        test('testing the result of start method, by checking parentElement', () => {
            const { element } = doc.findParentElementByChildId({ id: 'dom_element' });
            expect(element.id).toBe('root');
        });
    });
});
