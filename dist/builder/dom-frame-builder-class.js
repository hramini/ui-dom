"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_container_class_1 = require("../container/dom-container-class");
const dom_builder_class_1 = require("./dom-builder-class");
class DomFrameBuilder extends dom_builder_class_1.DomBuilder {
    constructor() {
        super();
        this.doc = new virtual_document_1.VirtualDocument();
    }
    buildElement(param) {
        const { name: Unit, children } = param;
        let { properties } = param;
        DomFrameBuilder.appendChildrenToProperties({
            children,
            properties
        });
        const { properties: appendedKeyProperties } = DomFrameBuilder.appendKeyProperties({
            properties
        });
        properties = Object.assign({}, appendedKeyProperties);
        const domContainer = dom_container_class_1.DomContainer.getInstance();
        const { unit: unitInstance, previousTag, updateTag } = domContainer.getUnit({
            properties,
            unit: Unit
        });
        const { element: unitElement } = this.doc.makeElement({
            tagName: `${Unit.name.toLowerCase()}-unit`
        });
        const { element } = unitInstance.getProvidedView();
        virtual_document_1.VirtualDocument.append({
            element,
            source: unitElement
        });
        virtual_document_1.VirtualDocument.setAttribute({
            attributeKey: 'pre-unit-data',
            attributeValue: previousTag.toString(),
            sourceElement: unitElement
        });
        virtual_document_1.VirtualDocument.setAttribute({
            attributeKey: 'unit-data',
            sourceElement: unitElement,
            attributeValue: updateTag.toString()
        });
        return { element: unitElement };
    }
    static appendChildrenToProperties(param) {
        const { properties, children } = param;
        const { status: childrenLengthStatus } = dom_builder_class_1.DomBuilder.checkChildren({ children });
        if (childrenLengthStatus) {
            properties.children = children;
        }
    }
    static appendKeyProperties(param) {
        const { properties } = param;
        const randomRangeNumber = 1000;
        if (typeof properties.key === 'undefined') {
            properties.key = Math.floor(Math.random() * randomRangeNumber);
        }
        return { properties };
    }
}
exports.DomFrameBuilder = DomFrameBuilder;
