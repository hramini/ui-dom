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
    describe('#getUnit', () => {
        const mountLifeCycleText = 'CBpPAp';
        const updateLifeCycleText = 'BuPAu';
        test(`expects mountLifeCycleText to be ${mountLifeCycleText} after getting unit for the first time`, () => {
            const { unit } = domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: { key: 1 } });
            const domUnit = unit;
            expect(domUnit.getMountLifeCycleResult()).toBe(mountLifeCycleText);
        });
        test(`expects updateLifeCycleText to be ${updateLifeCycleText} after getting unit for the second and more time`, () => {
            domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const { unit: updatedUnit } = domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const domUnit = updatedUnit;
            expect(domUnit.getUpdateLifeCycleResult()).toBe(updateLifeCycleText);
        });
        test('expects updateTags to be different each times this method is called for the same unit', () => {
            const { updateTag } = domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const { updateTag: updatedUnitUpdateTag } = domContainer.getUnit({
                unit: dom_unit_demo_class_1.DomUnitDemo,
                properties: {}
            });
            expect(updateTag).not.toBe(updatedUnitUpdateTag);
        });
    });
});
