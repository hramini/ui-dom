"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomContainer {
    constructor() {
        this.units = {};
    }
    extractUnit(param) {
        const { DomUnitConstructor, properties } = param;
        this.DomUnitConstructor = DomUnitConstructor;
        this.properties = properties;
        const { status } = this.checkUnitExistence();
        if (status) {
            this.updateUnit();
        }
        else {
            this.setUnit();
        }
        const { unitKeyName } = this.getUnitKeyName();
        const { units } = this.getUnits();
        const { [unitKeyName]: taggedUnit } = units;
        const { domUnit, updateTag, previousTag } = taggedUnit;
        return { domUnit, previousTag, updateTag };
    }
    getUnits() {
        const { units } = this;
        return { units };
    }
    setUnit() {
        const { properties, DomUnitConstructor } = this;
        const domUnit = new DomUnitConstructor();
        domUnit.runMountLifeCycle({ properties });
        const { updateTag } = DomContainer.getNewUpdateTag();
        const { unitKeyName } = this.getUnitKeyName();
        const { units } = this.getUnits();
        units[unitKeyName] = {
            domUnit,
            previousTag: 0,
            updateTag
        };
    }
    updateUnit() {
        const { properties } = this;
        const { domUnit } = this.updateUnitTag();
        domUnit.runUpdateLifeCycle({ properties });
    }
    checkUnitExistence() {
        const { unitKeyName } = this.getUnitKeyName();
        const { units } = this.getUnits();
        const { [unitKeyName]: taggedUnit } = units;
        return { status: !!taggedUnit };
    }
    updateUnitTag() {
        const { unitKeyName } = this.getUnitKeyName();
        const { units } = this.getUnits();
        const { [unitKeyName]: taggedUnit } = units;
        const { domUnit, updateTag } = taggedUnit;
        taggedUnit.previousTag = updateTag;
        const { updateTag: newUpdateTag } = DomContainer.getNewUpdateTag();
        taggedUnit.updateTag = newUpdateTag;
        return { domUnit };
    }
    getUnitKeyName() {
        const { properties, DomUnitConstructor } = this;
        const { key } = properties;
        const { name } = DomUnitConstructor;
        const unitKeyName = `${name}-${(key !== null && key !== void 0 ? key : '')}`;
        return { unitKeyName };
    }
    static getInstance() {
        if (DomContainer.domContainer === undefined) {
            DomContainer.domContainer = new DomContainer();
        }
        return { domContainer: DomContainer.domContainer };
    }
    static getNewUpdateTag() {
        const downRange = 10000000;
        const upRange = 99999999;
        const randomNumber = Math.random() * upRange + downRange;
        return { updateTag: Math.floor(randomNumber) };
    }
}
exports.DomContainer = DomContainer;
