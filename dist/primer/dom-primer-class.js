"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
const dom_unit_class_1 = require("../unit/dom-unit-class");
class DomPrimer {
    constructor() {
        Object.setPrototypeOf(ui_wrapper_1.Unit.prototype, dom_unit_class_1.DomUnit.prototype);
    }
    setElement(param) {
        const { element } = param;
        this.element = element;
    }
    setTarget(param) {
        const { target } = param;
        this.target = target;
    }
    start() {
        this.target.append(this.element);
    }
}
exports.DomPrimer = DomPrimer;
