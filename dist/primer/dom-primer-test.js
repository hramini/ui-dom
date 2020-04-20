"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_primer_class_1 = require("./dom-primer-class");
describe('@DomPrimer', () => {
    let doc;
    let docDemo;
    let domPrimer;
    const domTagName = 'dom-tag';
    const rootId = 'root';
    beforeEach(() => {
        doc = new virtual_document_1.VirtualDocument();
        docDemo = new virtual_document_1.VirtualDocumentDemo({ virtualDocument: doc });
        docDemo.createBase();
        domPrimer = new dom_primer_class_1.DomPrimer();
    });
    describe('#setElement', () => {
        test('expects to set value to "element" property', () => {
            const { element } = doc.makeElement({ tagName: domTagName });
            domPrimer.setElement({ element });
            const { element: { tagName: elementTagName } } = domPrimer;
            expect(elementTagName).toBe(domTagName);
        });
    });
    describe('#setTarget', () => {
        test('expects to set value to "target" property', () => {
            const { element: target } = doc.findElementById({ identifier: rootId });
            domPrimer.setTarget({ target });
            const { target: { id: targetId } } = domPrimer;
            expect(targetId).toBe(rootId);
        });
    });
    describe('#start', () => {
        test('expects to append element value into target', () => {
            const { element } = doc.makeElement({ tagName: domTagName });
            virtual_document_1.VirtualDocument.setId({ identifier: 'dom_element', source: element });
            const { element: target } = doc.findElementById({ identifier: rootId });
            domPrimer.setElement({ element });
            domPrimer.setTarget({ target });
            domPrimer.start();
            const { isFound, element: { tagName } } = doc.findElementById({ identifier: 'dom_element' });
            const { isFound: isParentFound, parentElement: { id: parentElementId } } = virtual_document_1.VirtualDocument.getParentElement({ element });
            expect(isFound).toBeTruthy();
            expect(tagName).toBe('dom-tag');
            expect(isParentFound).toBeTruthy();
            expect(parentElementId).toBe('root');
        });
    });
});
