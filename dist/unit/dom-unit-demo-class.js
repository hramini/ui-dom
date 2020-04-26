"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_unit_class_1 = require("./dom-unit-class");
class DomUnitDemo extends dom_unit_class_1.DomUnit {
    constructor() {
        super();
        this.doc = new virtual_document_1.VirtualDocument({
            doc: document
        });
        this.mountLifeCycleResult = 'C';
        this.updateLifeCycleResult = '';
        this.disposeLifeCycleResult = '';
        this.onBeforeUpdateReturn = true;
    }
    onBeforeProvide() {
        this.mountLifeCycleResult += 'Bp';
    }
    onAfterProvide() {
        this.mountLifeCycleResult += 'Ap';
    }
    onBeforeUpdate() {
        const { onBeforeUpdateReturn } = this;
        this.updateLifeCycleResult = 'Bu';
        return { shouldUpdate: onBeforeUpdateReturn };
    }
    onAfterUpdate() {
        this.updateLifeCycleResult += 'Au';
    }
    onBeforeDispose() {
        this.disposeLifeCycleResult += 'Bd';
    }
    provide() {
        const { doc, props } = this;
        this.mountLifeCycleResult += 'P';
        this.updateLifeCycleResult += 'P';
        const { element } = doc.createNewElement({ tagName: 'dom-unit-demo' });
        const { title, children: childrenProperty } = props;
        virtual_document_1.VirtualDocument.setAttribute({
            attributeKey: 'title',
            attributeValue: (title !== null && title !== void 0 ? title : ''),
            element
        });
        const children = (childrenProperty !== null && childrenProperty !== void 0 ? childrenProperty : []);
        children.map((child) => {
            element.append(child);
            return child;
        });
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
    setOnBeforeUpdateReturn(param) {
        const { value } = param;
        this.onBeforeUpdateReturn = value;
    }
    getState() {
        const { state } = this;
        return { state };
    }
}
exports.DomUnitDemo = DomUnitDemo;
