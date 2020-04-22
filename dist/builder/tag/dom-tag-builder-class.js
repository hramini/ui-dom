"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_builder_class_1 = require("../common/dom-builder-class");
class DomTagBuilder extends dom_builder_class_1.DomBuilder {
    constructor() {
        super();
        this.virtualDocument = new virtual_document_1.VirtualDocument({
            doc: document
        });
    }
    buildElement(param) {
        const { name, properties, children } = param;
        const { element } = this.virtualDocument.createNewElement({ tagName: name });
        DomTagBuilder.appendProperties({ element, properties });
        dom_builder_class_1.DomBuilder.appendChildrenToProperties({ children, properties });
        const { children: childrenProperty } = properties;
        DomTagBuilder.appendChildren({ children: childrenProperty, element });
        return { element };
    }
    static appendChildren(param) {
        const { element, children } = param;
        const { status: childrenLengthStatus } = dom_builder_class_1.DomBuilder.checkChildren({ children });
        if (childrenLengthStatus) {
            virtual_document_1.VirtualDocument.setInnerHtml({
                element,
                innerHtml: ''
            });
            const arrayChildren = children;
            arrayChildren.forEach((child) => {
                virtual_document_1.VirtualDocument.append({
                    appendTo: element,
                    element: child
                });
            });
        }
    }
    static appendProperties(param) {
        const { element, properties } = param;
        Object.entries(properties).forEach((property) => {
            const [key, value] = property;
            const { status } = dom_builder_class_1.DomBuilder.checkTypeOf({ type: 'function', value });
            if (status) {
                const functionKey = key.replace('on', '');
                element.addEventListener(functionKey.toLowerCase(), value);
            }
            else if (key !== 'children') {
                virtual_document_1.VirtualDocument.setAttribute({
                    attributeKey: key,
                    attributeValue: value,
                    element
                });
            }
        });
    }
}
exports.DomTagBuilder = DomTagBuilder;
