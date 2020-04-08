"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_unit_demo_class_1 = require("../unit/dom-unit-demo-class");
const dom_container_class_1 = require("./dom-container-class");
describe('@DomContainer', () => {
    let domContainer;
    beforeAll(() => {
        domContainer = dom_container_class_1.DomContainer.getInstance();
    });
    describe('#getUnit', () => {
        test('check mount life cycle of DomUnitDemo after getting unit', () => {
            const { unit } = domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: { key: 1 } });
            const domUnit = unit;
            expect(domUnit.getMountLifeCycleResult()).toBe('CBpPAp');
        });
        test('check update life cycle of DomUnitDemo after getting existed unit', () => {
            domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const { unit: updatedUnit } = domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const domUnit = updatedUnit;
            expect(domUnit.getUpdateLifeCycleResult()).toBe('BuPAu');
        });
        test('check update life cycle of DomUnitDemo after getting existed unit', () => {
            const { updateTag } = domContainer.getUnit({ unit: dom_unit_demo_class_1.DomUnitDemo, properties: {} });
            const { updateTag: updatedUnitUpdateTag } = domContainer.getUnit({
                unit: dom_unit_demo_class_1.DomUnitDemo,
                properties: {}
            });
            expect(updateTag).not.toBe(updatedUnitUpdateTag);
        });
    });
});
