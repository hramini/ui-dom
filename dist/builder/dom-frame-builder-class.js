"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
const dom_container_demo_class_1 = require("../container/dom-container-demo-class");
class DomFrameBuilder {
    constructor() {
        this.doc = new ui_wrapper_1.VirtualDocument();
    }
    buildElement(elementOption) {
        const { name: Unit, properties, children } = elementOption;
        this.appendChildrenToProperties({
            properties,
            children
        });
        this.appendKeyProperties(properties);
        const { unit: unitInstance, previousTag, updateTag } = dom_container_demo_class_1.DomContainerDemo.getUnit({
            unit: Unit,
            properties
        });
        const { element: unitElement } = this.doc.makeElement({
            tagName: `${Unit.name.toLowerCase()}-unit`
        });
        const { element } = unitInstance.getProvidedView();
        this.doc.append({
            source: unitElement,
            element
        });
        this.doc.setAttribute({
            sourceElement: unitElement,
            attributeKey: 'pre-unit-data',
            attributeValue: previousTag.toString()
        });
        this.doc.setAttribute({
            sourceElement: unitElement,
            attributeKey: 'unit-data',
            attributeValue: updateTag.toString()
        });
        return { element: unitElement };
    }
    checkChildrenLength(param) {
        const { children } = param;
        return !children || children.length > 0;
    }
    appendChildrenToProperties(param) {
        const { properties, children } = param;
        if (this.checkChildrenLength({ children })) {
            properties.children = children;
        }
    }
    appendKeyProperties(props) {
        if (!props.key) {
            props.key = Math.floor(Math.random() * 1000);
        }
    }
}
exports.DomFrameBuilder = DomFrameBuilder;
