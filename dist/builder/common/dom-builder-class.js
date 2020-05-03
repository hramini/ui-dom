"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
class DomBuilder {
    constructor() {
        this.doc = new virtual_document_1.VirtualDocument({ doc: document });
    }
    static checkTypeOf(param) {
        const { value, type } = param;
        return { status: typeof value === type };
    }
    static checkChildren(param) {
        const { children } = param;
        const childrenArray = (children !== null && children !== void 0 ? children : []);
        return { status: childrenArray.length > 0 };
    }
    static appendChildrenToProperties(param) {
        const { properties, children } = param;
        const { status: childrenLengthStatus } = DomBuilder.checkChildren({ children });
        if (childrenLengthStatus) {
            properties.children = children;
        }
    }
}
exports.DomBuilder = DomBuilder;
