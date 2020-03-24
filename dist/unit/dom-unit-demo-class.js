"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
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
        this.doc = new ui_wrapper_1.VirtualDocument();
        this.mountLifeCycleResult += 'P';
        this.updateLifeCycleResult += 'P';
        const { element } = this.doc.makeElement({ tagName: 'dom-unit-demo' });
        element.setAttribute('title', this.props.title || '');
        if (typeof this.props.children === 'string') {
            element.innerHTML = this.props.children;
        }
        else {
            const children = this.props.children || [];
            children.map((child) => {
                element.append(child);
            });
        }
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
