"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_primer_class_1 = require("./dom-primer-class");
describe('@DomPrimer', () => {
    let doc;
    let docDemo;
    let domPrimer;
    beforeAll(() => {
        doc = new virtual_document_1.VirtualDocument();
        docDemo = new virtual_document_1.VirtualDocumentDemo({ virtualDocument: doc });
        docDemo.createBase();
        domPrimer = new dom_primer_class_1.DomPrimer();
    });
    describe('#start', () => {
        test('testing the result of start method, by finding id', () => {
            const { element } = doc.makeElement({ tagName: 'dom-tag' });
            virtual_document_1.VirtualDocument.setId({ source: element, identifier: 'dom_element' });
            const { element: target } = doc.findElementById({ identifier: 'root' });
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
