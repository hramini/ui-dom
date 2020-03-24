"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
class DomBuilder {
    constructor() {
        this.virtualDom = new ui_wrapper_1.VirtualDocument();
    }
    checkChildren(param) {
        const { children } = param;
        return !children || children.length > 0;
    }
    checkPropertyValueType(param) {
        const { value, type } = param;
        return typeof value === type;
    }
    appendChildren(param) {
        const { element, children } = param;
        if (this.checkChildren({ children })) {
            element.innerHTML = '';
            if (this.checkPropertyValueType({ value: children, type: 'string' })) {
                element.append(children);
            }
            else {
                const arrayChildren = children;
                arrayChildren.map((child) => {
                    element.append(child);
                });
            }
        }
    }
}
exports.DomBuilder = DomBuilder;
