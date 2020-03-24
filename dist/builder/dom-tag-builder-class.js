"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_builder_class_1 = require("./dom-builder-class");
class DomTagBuilder extends dom_builder_class_1.DomBuilder {
    constructor() {
        super();
    }
    buildElement(param) {
        const { name, properties, children } = param;
        const element = document.createElement(name);
        this.appendProperties({ element, properties });
        this.appendChildren({ element, children });
        return { element };
    }
    appendProperties(param) {
        const { element, properties } = param;
        properties &&
            Object.entries(properties).map(([key, value]) => {
                if (this.checkPropertyValueType({ value, type: 'function' })) {
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
