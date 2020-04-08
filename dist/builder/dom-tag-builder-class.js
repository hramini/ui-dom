"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_builder_class_1 = require("./dom-builder-class");
class DomTagBuilder extends dom_builder_class_1.DomBuilder {
    constructor() {
        super();
        this.virtualDocument = new virtual_document_1.VirtualDocument({
            doc: document
        });
    }
    buildElement(param) {
        const { name, properties, children } = param;
        const { element } = this.virtualDocument.makeElement({ tagName: name });
        DomTagBuilder.appendProperties({ element, properties });
        DomTagBuilder.appendChildren({ element, children });
        return { element };
    }
    static appendChildren(param) {
        const { element, children } = param;
        const { status: childrenLengthStatus } = dom_builder_class_1.DomBuilder.checkChildren({ children });
        if (childrenLengthStatus) {
            virtual_document_1.VirtualDocument.setInnerHtml({
                source: element,
                innerHtml: ''
            });
            const arrayChildren = children;
            arrayChildren.forEach((child) => {
                virtual_document_1.VirtualDocument.append({
                    source: element,
                    element: child
                });
            });
        }
    }
    static appendProperties(param) {
        const { element, properties } = param;
        Object.entries(properties).forEach((property) => {
            let [key] = property;
            const [, value] = property;
            const { status } = dom_builder_class_1.DomBuilder.checkTypeOf({ value, type: 'function' });
            if (status) {
                key = key.replace('on', '');
                element.addEventListener(key.toLowerCase(), value);
            }
            else {
                element.setAttribute(key, value);
            }
        });
    }
}
exports.DomTagBuilder = DomTagBuilder;
