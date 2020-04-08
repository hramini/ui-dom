"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
class DomBuilder {
    constructor() {
        this.virtualDom = new virtual_document_1.VirtualDocument();
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
}
exports.DomBuilder = DomBuilder;
