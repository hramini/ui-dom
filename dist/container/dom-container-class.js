"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomContainer {
    constructor() {
        this.units = {};
    }
    getUnit(param) {
        const { unit, properties } = param;
        const { status } = this.checkUnitExistence({ unit, properties });
        if (status) {
            this.updateUnit({ unit, properties });
        }
        else {
            this.setUnit({ unit, properties });
        }
        const { unitKeyName } = DomContainer.getUnitKeyName({ unit, properties });
        const { unit: registeredUnit, updateTag, previousTag } = this.units[unitKeyName];
        return { unit: registeredUnit, updateTag, previousTag };
    }
    setUnit(param) {
        const { unit: UnitClass, properties } = param;
        const unitInstance = new UnitClass();
        unitInstance.runMountLifeCycle({ properties });
        const { updateTag } = DomContainer.getNewUpdateTag();
        const { unitKeyName } = DomContainer.getUnitKeyName({ unit: UnitClass, properties });
        this.units[unitKeyName] = {
            unit: unitInstance,
            updateTag,
            previousTag: 0
        };
    }
    updateUnit(param) {
        const { unit, properties } = param;
        const { unitKeyName } = DomContainer.getUnitKeyName({ unit, properties });
        const { [unitKeyName]: taggedUnit } = this.units;
        const { unit: unitInstance } = taggedUnit;
        DomContainer.updateUnitTag({ taggedUnit });
        unitInstance.runUpdateLifeCycle({ properties });
    }
    checkUnitExistence(param) {
        const { unit, properties } = param;
        const { unitKeyName } = DomContainer.getUnitKeyName({ unit, properties });
        const { [unitKeyName]: taggedUnit } = this.units;
        return { status: !!taggedUnit };
    }
    static getInstance() {
        if (DomContainer.domContainer === undefined) {
            DomContainer.domContainer = new DomContainer();
        }
        return { domContainer: DomContainer.domContainer };
    }
    static updateUnitTag(param) {
        const { taggedUnit } = param;
        taggedUnit.previousTag = taggedUnit.updateTag;
        const { updateTag } = DomContainer.getNewUpdateTag();
        taggedUnit.updateTag = updateTag;
    }
    static getNewUpdateTag() {
        const downRange = 10000000;
        const upRange = 99999999;
        const randomNumber = Math.random() * upRange + downRange;
        return { updateTag: Math.floor(randomNumber) };
    }
    static getUnitKeyName(param) {
        const { unit: { name }, properties: { key } } = param;
        const unitKeyName = `${name}-${(key !== null && key !== void 0 ? key : '')}`;
        return { unitKeyName };
    }
}
exports.DomContainer = DomContainer;
