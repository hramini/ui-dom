"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_unit_simple_demo_class_1 = require("./dom-unit-simple-demo-class");
describe('@DomUnit / no override', () => {
    describe('#runMountLifeCycle', () => {
        test('testing the unit life cycle for mounting', () => {
            const domUnitView = new dom_unit_simple_demo_class_1.DomUnitSimpleDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            expect(domUnitView.getMountLifeCycleResult()).toBe('CP');
        });
    });
    describe('#runUpdateLifeCycle', () => {
        test('testing the unit life cycle for updating', () => {
            const domUnitView = new dom_unit_simple_demo_class_1.DomUnitSimpleDemo();
            domUnitView.runMountLifeCycle({
                properties: {}
            });
            domUnitView.runUpdateLifeCycle({ properties: {} });
            expect(domUnitView.getUpdateLifeCycleResult()).toBe('PP');
        });
    });
    describe('#runDisposeLifeCycle', () => {
        test('testing the unit life cycle for disposing', () => {
            const domUnitView = new dom_unit_simple_demo_class_1.DomUnitSimpleDemo();
            domUnitView.runDisposeLifeCycle();
            expect(domUnitView.getDisposeLifeCycleResult()).toBe('');
        });
    });
});
