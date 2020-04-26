"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_1 = require("virtual-document");
class DomUnit {
    constructor() {
        this.doc = new virtual_document_1.VirtualDocument({
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
        const { providedView } = this;
        return { element: providedView };
    }
    forceUpdate() {
        const { props } = this;
        this.runUpdateLifeCycle({ properties: props });
    }
    alterState(param) {
        var _a;
        const { props, state } = this;
        const { state: paramState, callbackFunction } = param;
        this.state = Object.assign(Object.assign({}, state), paramState);
        this.runUpdateLifeCycle({ properties: props });
        (_a = callbackFunction) === null || _a === void 0 ? void 0 : _a();
    }
    setProps(param) {
        const { properties } = param;
        this.props = properties;
    }
    updateElementInDocument() {
        const { providedView, doc } = this;
        const { isFound: isAttributeFound, attributeValue } = virtual_document_1.VirtualDocument.findAttribute({
            attributeKey: 'pre-unit-data',
            element: providedView
        });
        if (isAttributeFound) {
            const { tagName } = providedView;
            const { isFound: isElementFound, element } = doc.findFirstElementByQuery({
                query: `${tagName.toLowerCase()}[unit-data="${attributeValue}"]`
            });
            if (isElementFound) {
                virtual_document_1.VirtualDocument.replaceElements({
                    replaceableElement: providedView,
                    sourceElement: element
                });
            }
        }
    }
}
exports.DomUnit = DomUnit;
