"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
const dom_unit_class_1 = require("./dom-unit-class");
class DomUnitDemo extends dom_unit_class_1.DomUnit {
    constructor() {
        super();
        this.mountLifeCycleResult = '';
        this.updateLifeCycleResult = '';
        this.disposeLifeCycleResult = '';
        this.onBeforeUpdateReturn = true;
        this.mountLifeCycleResult = 'C';
    }
    onBeforeProvide() {
        this.mountLifeCycleResult += 'Bp';
    }
    onAfterProvide() {
        this.mountLifeCycleResult += 'Ap';
    }
    onBeforeUpdate() {
        this.updateLifeCycleResult = 'Bu';
        return { shouldUpdate: this.onBeforeUpdateReturn };
    }
    onAfterUpdate() {
        this.updateLifeCycleResult += 'Au';
    }
    onBeforeDispose() {
        this.disposeLifeCycleResult += 'Bd';
    }
    provide() {
        var _a;
        this.doc = new virtual_document_1.VirtualDocument({
            doc: document
        });
        this.mountLifeCycleResult += 'P';
        this.updateLifeCycleResult += 'P';
        const { element } = this.doc.makeElement({ tagName: 'dom-unit-demo' });
        virtual_document_1.VirtualDocument.setAttribute({
            sourceElement: element,
            attributeKey: 'title',
            attributeValue: (_a = this.props.title, (_a !== null && _a !== void 0 ? _a : ''))
        });
        const { children: childrenProperty } = this.props;
        const children = (childrenProperty !== null && childrenProperty !== void 0 ? childrenProperty : []);
        children.map((child) => {
            element.append(child);
            return child;
        });
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
    changeOnBeforeUpdateReturn(value) {
        this.onBeforeUpdateReturn = value;
    }
    getState() {
        return { state: this.state };
    }
}
exports.DomUnitDemo = DomUnitDemo;
