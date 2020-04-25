"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_unit_class_1 = require("../unit/dom-unit-class");
class DomPrimer {
    constructor() {
        this.unitPrototype = dom_unit_class_1.DomUnit.prototype;
    }
    getUnitPrototype() {
        const { unitPrototype } = this;
        return { unitPrototype };
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
