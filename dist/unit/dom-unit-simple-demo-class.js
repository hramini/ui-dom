"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_unit_class_1 = require("./dom-unit-class");
class DomUnitSimpleDemo extends dom_unit_class_1.DomUnit {
    constructor() {
        super();
        this.doc = new virtual_document_1.VirtualDocument();
        this.mountLifeCycleResult = 'C';
        this.updateLifeCycleResult = '';
        this.disposeLifeCycleResult = '';
    }
    provide() {
        const { doc } = this;
        this.mountLifeCycleResult += 'P';
        this.updateLifeCycleResult += 'P';
        const { element } = doc.createNewElement({ tagName: 'dom-unit-demo' });
        return { element };
    }
    getMountLifeCycleResult() {
        const { mountLifeCycleResult } = this;
        return { lifeCycleResult: mountLifeCycleResult };
    }
    getUpdateLifeCycleResult() {
        const { updateLifeCycleResult } = this;
        return { lifeCycleResult: updateLifeCycleResult };
    }
    getDisposeLifeCycleResult() {
        const { disposeLifeCycleResult } = this;
        return { lifeCycleResult: disposeLifeCycleResult };
    }
}
exports.DomUnitSimpleDemo = DomUnitSimpleDemo;
