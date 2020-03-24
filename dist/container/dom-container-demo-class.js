"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_container_class_1 = require("./dom-container-class");
class DomContainerDemo extends dom_container_class_1.DomContainer {
    static flushInstance(param) {
        const { name } = param;
        delete this.units[name];
    }
}
exports.DomContainerDemo = DomContainerDemo;
