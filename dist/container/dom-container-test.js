"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_unit_demo_class_1 = require("../unit/dom-unit-demo-class");
const dom_container_demo_class_1 = require("./dom-container-demo-class");
describe('@DomContainer', () => {
    describe('#getUnit', () => {
        test('get unit of a dom unit should be defined', () => {
            dom_container_demo_class_1.DomContainerDemo.flushInstance({ name: dom_unit_demo_class_1.DomUnitDemo.name });
            const { unit, previousTag } = dom_container_demo_class_1.DomContainerDemo.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            expect(unit).toBeDefined();
            expect(previousTag).toBe(0);
        });
        test('check mount life cycle of DomUnitDemo after getting unit', () => {
            dom_container_demo_class_1.DomContainerDemo.flushInstance({ name: dom_unit_demo_class_1.DomUnitDemo.name });
            const { unit } = dom_container_demo_class_1.DomContainerDemo.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: { key: 1 } });
            const domUnit = unit;
            expect(domUnit.getMountLifeCycleResult()).toBe('CBpPAp');
        });
        test('check update life cycle of DomUnitDemo after getting existed unit', () => {
            dom_container_demo_class_1.DomContainerDemo.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const { unit: updatedUnit } = dom_container_demo_class_1.DomContainerDemo.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const domUnit = updatedUnit;
            expect(domUnit.getUpdateLifeCycleResult()).toBe('BuPAu');
        });
        test('check update life cycle of DomUnitDemo after getting existed unit', () => {
            const { updateTag } = dom_container_demo_class_1.DomContainerDemo.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const { updateTag: updatedUnitUpdateTag } = dom_container_demo_class_1.DomContainerDemo.getUnit({
                unit: dom_unit_demo_class_1.DomUnitDemo,
                properties: {}
            });
            expect(updateTag).not.toBe(updatedUnitUpdateTag);
        });
    });
});
