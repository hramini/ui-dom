"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_unit_demo_class_1 = require("../unit/dom-unit-demo-class");
const dom_container_class_1 = require("./dom-container-class");
describe('@DomContainer', () => {
    let domContainer;
    beforeEach(() => {
        const { domContainer: domContainerInstance } = dom_container_class_1.DomContainer.getInstance();
        domContainer = domContainerInstance;
    });
    describe('$#getInstance', () => {
        test('expects to be an instance of @DomContainer', () => {
            const { domContainer: domContainerInstance } = dom_container_class_1.DomContainer.getInstance();
            expect(domContainerInstance).toBeInstanceOf(dom_container_class_1.DomContainer);
        });
    });
    describe('#extractUnit', () => {
        const mountLifeCycleText = 'CBpPAp';
        const updateLifeCycleText = 'BuPAu';
        test(`expects mountLifeCycleText to be ${mountLifeCycleText} after getting unit for the first time`, () => {
            const { unit } = domContainer.extractUnit({
                DomUnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                properties: { key: 1 }
            });
            const domUnit = unit;
            const { lifeCycleResult } = domUnit.getMountLifeCycleResult();
            expect(lifeCycleResult).toBe(mountLifeCycleText);
        });
        test(`expects updateLifeCycleText to be ${updateLifeCycleText} after getting unit for the second and more time`, () => {
            domContainer.extractUnit({ DomUnitConstructor: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const { unit: updatedUnit } = domContainer.extractUnit({
                DomUnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                properties: {}
            });
            const domUnit = updatedUnit;
            const { lifeCycleResult } = domUnit.getUpdateLifeCycleResult();
            expect(lifeCycleResult).toBe(updateLifeCycleText);
        });
        test('expects updateTags to be different each times this method is called for the same unit', () => {
            const { updateTag } = domContainer.extractUnit({
                DomUnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                properties: {}
            });
            const { updateTag: updatedUnitUpdateTag } = domContainer.extractUnit({
                DomUnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
                properties: {}
            });
            expect(updateTag).not.toBe(updatedUnitUpdateTag);
        });
    });
});
