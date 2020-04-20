"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_frame_builder_class_1 = require("../builder/frame/dom-frame-builder-class");
const dom_unit_class_1 = require("./dom-unit-class");
const dom_unit_demo_class_1 = require("./dom-unit-demo-class");
class DomUnitFrameDemo extends dom_unit_class_1.DomUnit {
    constructor() {
        super();
        this.builder = new dom_frame_builder_class_1.DomFrameBuilder();
    }
    provide() {
        const { element } = this.builder.buildElement({
            UnitConstructor: dom_unit_demo_class_1.DomUnitDemo,
            properties: { key: 1 }
        });
        return { element };
    }
}
exports.DomUnitFrameDemo = DomUnitFrameDemo;
