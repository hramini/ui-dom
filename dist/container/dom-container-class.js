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
        const { unit: registeredUnit, updateTag, previousTag } = this.units[unitKeyName];
        return { previousTag, unit: registeredUnit, updateTag };
    }
    setUnit() {
        const { properties } = this;
        const { DomUnitConstructor } = this;
        const domUnitInstance = new DomUnitConstructor();
        domUnitInstance.runMountLifeCycle({ properties });
        const { updateTag } = DomContainer.getNewUpdateTag();
        const { unitKeyName } = this.getUnitKeyName();
        this.units[unitKeyName] = {
            previousTag: 0,
            unit: domUnitInstance,
            updateTag
        };
    }
    updateUnit() {
        const { properties } = this;
        const { unitInstance } = this.updateUnitTag();
        unitInstance.runUpdateLifeCycle({ properties });
    }
    checkUnitExistence() {
        const { unitKeyName } = this.getUnitKeyName();
        const { [unitKeyName]: taggedUnit } = this.units;
        return { status: !!taggedUnit };
    }
    updateUnitTag() {
        const { unitKeyName } = this.getUnitKeyName();
        const { [unitKeyName]: taggedUnit } = this.units;
        const { unit: unitInstance } = taggedUnit;
        taggedUnit.previousTag = taggedUnit.updateTag;
        const { updateTag } = DomContainer.getNewUpdateTag();
        taggedUnit.updateTag = updateTag;
        return { unitInstance };
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
