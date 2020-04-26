"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_container_class_1 = require("../../container/dom-container-class");
const dom_builder_class_1 = require("../common/dom-builder-class");
class DomFrameBuilder extends dom_builder_class_1.DomBuilder {
    constructor() {
        super();
        this.doc = new virtual_document_1.VirtualDocument();
    }
    buildElement(param) {
        const { UnitConstructor, children } = param;
        const { properties } = param;
        dom_builder_class_1.DomBuilder.appendChildrenToProperties({
            children,
            properties
        });
        DomFrameBuilder.appendKeyProperties({
            properties
        });
        const { domContainer } = dom_container_class_1.DomContainer.getInstance();
        const { unit: unitInstance, previousTag, updateTag } = domContainer.extractUnit({
            DomUnitConstructor: UnitConstructor,
            properties
        });
        const { element: unitElement } = this.doc.createNewElement({
            tagName: `${UnitConstructor.name.toLowerCase()}-unit`
        });
        const { element } = unitInstance.getProvidedView();
        virtual_document_1.VirtualDocument.append({
            appendTo: unitElement,
            element
        });
        virtual_document_1.VirtualDocument.setAttribute({
            attributeKey: 'pre-unit-data',
            attributeValue: previousTag.toString(),
            element: unitElement
        });
        virtual_document_1.VirtualDocument.setAttribute({
            attributeKey: 'unit-data',
            attributeValue: updateTag.toString(),
            element: unitElement
        });
        return { element: unitElement };
    }
    static appendKeyProperties(param) {
        const { properties } = param;
        const randomRangeNumber = 1000;
        if (typeof properties.key === 'undefined') {
            properties.key = Math.floor(Math.random() * randomRangeNumber);
        }
    }
}
exports.DomFrameBuilder = DomFrameBuilder;