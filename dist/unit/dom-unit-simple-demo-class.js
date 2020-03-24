"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
const dom_unit_class_1 = require("./dom-unit-class");
class DomUnitSimpleDemo extends dom_unit_class_1.DomUnit {
    constructor() {
        super();
        this.doc = new ui_wrapper_1.VirtualDocument();
        this.mountLifeCycleResult = 'C';
        this.updateLifeCycleResult = '';
        this.disposeLifeCycleResult = '';
    }
    provide() {
        this.mountLifeCycleResult += 'P';
        this.updateLifeCycleResult += 'P';
        const { element } = this.doc.makeElement({ tagName: 'dom-unit-demo' });
        return { element };
    }
    getMountLifeCycleResult() {
        return this.mountLifeCycleResult;
    }
    getUpdateLifeCycleResult() {
        return this.updateLifeCycleResult;
    }
    getDisposeLifeCycleResult() {
        return this.disposeLifeCycleResult;
    }
}
exports.DomUnitSimpleDemo = DomUnitSimpleDemo;
