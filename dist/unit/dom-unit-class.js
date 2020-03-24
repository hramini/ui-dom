"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_wrapper_1 = require("ui-wrapper");
class DomUnit {
    constructor() {
        this.doc = new ui_wrapper_1.VirtualDocument({
            doc: document
        });
    }
    onBeforeProvide() { }
    onAfterProvide() { }
    onBeforeUpdate() {
        return { shouldUpdate: true };
    }
    onAfterUpdate() { }
    onBeforeDispose() { }
    runMountLifeCycle(param) {
        const { properties } = param;
        this.setProps({ properties });
        this.onBeforeProvide();
        const { element } = this.provide();
        this.providedView = element;
        this.onAfterProvide();
    }
    runUpdateLifeCycle(param) {
        const { properties } = param;
        const { shouldUpdate } = this.onBeforeUpdate();
        if (shouldUpdate) {
            this.setProps({ properties });
            const { element } = this.provide();
            this.providedView = element;
            this.updateElementInDocument();
            this.onAfterUpdate();
        }
    }
    runDisposeLifeCycle() {
        this.onBeforeDispose();
    }
    getProvidedView() {
        return { element: this.providedView };
    }
    forceUpdate() {
        this.runUpdateLifeCycle({ properties: this.props });
    }
    alterState(param) {
        const { state, callback } = param;
        this.state = Object.assign(Object.assign({}, this.state), state);
        this.runUpdateLifeCycle({ properties: this.props });
        callback && callback();
    }
    setProps(param) {
        const { properties } = param;
        this.props = properties;
    }
    updateElementInDocument() {
        const { isFound: isAttributeFound, attributeValue } = this.doc.findAttribute({
            sourceElement: this.providedView,
            attributeKey: 'pre-unit-data'
        });
        if (isAttributeFound) {
            const { isFound: isElementFound, foundElement } = this.doc.findFirstElementByQuery({
                query: `${this.providedView.tagName.toLowerCase()}[unit-data="${attributeValue}"]`
            });
            if (isElementFound) {
                this.doc.replaceElements({
                    sourceElement: foundElement,
                    replaceableElement: this.providedView
                });
            }
        }
    }
}
exports.DomUnit = DomUnit;
