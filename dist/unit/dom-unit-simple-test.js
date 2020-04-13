"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_unit_simple_demo_class_1 = require("./dom-unit-simple-demo-class");
describe('@DomUnit / no override', () => {
    describe('#runMountLifeCycle', () => {
        const mountLifeCycleText = 'CP';
        test(`expects mountLifeCycleResult to be ${mountLifeCycleText}`, () => {
            const domUnitView = new dom_unit_simple_demo_class_1.DomUnitSimpleDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            expect(domUnitView.getMountLifeCycleResult()).toBe(mountLifeCycleText);
        });
    });
    describe('#runUpdateLifeCycle', () => {
        const updateLifeCycleText = 'PP';
        test(`expects updateLifeCycleResult to be ${updateLifeCycleText}`, () => {
            const domUnitView = new dom_unit_simple_demo_class_1.DomUnitSimpleDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.runUpdateLifeCycle({ properties: {} });
            expect(domUnitView.getUpdateLifeCycleResult()).toBe(updateLifeCycleText);
        });
    });
    describe('#runDisposeLifeCycle', () => {
        const disposeLifeCycleText = '';
        test(`expects disposeLifeCycleResult to be ${disposeLifeCycleText}`, () => {
            const domUnitView = new dom_unit_simple_demo_class_1.DomUnitSimpleDemo();
            domUnitView.runDisposeLifeCycle();
            expect(domUnitView.getDisposeLifeCycleResult()).toBe(disposeLifeCycleText);
        });
    });
});
