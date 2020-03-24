"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomContainer {
    static getUnit(param) {
        const { unit, properties } = param;
        if (this.checkUnitExistence({ unit, properties })) {
            this.updateUnit({ unit, properties });
        }
        else {
            this.setUnit({ unit, properties });
        }
        const { unitKeyName } = this.getUnitKeyName({ unit, properties });
        const { unit: registeredUnit, updateTag, previousTag } = this.units[unitKeyName];
        return { unit: registeredUnit, updateTag, previousTag };
    }
    static setUnit(param) {
        const { unit, properties } = param;
        const unitInstance = new unit();
        unitInstance.runMountLifeCycle({ properties });
        const { updateTag } = this.getNewUpdateTag();
        const { unitKeyName } = this.getUnitKeyName({ unit, properties });
        this.units[unitKeyName] = {
            unit: unitInstance,
            updateTag,
            previousTag: 0
        };
    }
    static updateUnit(param) {
        const { unit, properties } = param;
        const { unitKeyName } = this.getUnitKeyName({ unit, properties });
        const taggedUnit = this.units[unitKeyName];
        const { unit: unitInstance } = taggedUnit;
        this.updateUnitTag({ taggedUnit });
        unitInstance.runUpdateLifeCycle({ properties });
    }
    static updateUnitTag(param) {
        const { taggedUnit } = param;
        taggedUnit.previousTag = taggedUnit.updateTag;
        const { updateTag } = this.getNewUpdateTag();
        taggedUnit.updateTag = updateTag;
    }
    static checkUnitExistence(param) {
        const { unit, properties } = param;
        const { unitKeyName } = this.getUnitKeyName({ unit, properties });
        return this.units[unitKeyName] !== undefined && this.units[name] !== null;
    }
    static getNewUpdateTag() {
        const down = 10000000;
        const up = 99999999;
        let randomNumber = Math.random() * up + down;
        return { updateTag: Math.floor(randomNumber) };
    }
    static getUnitKeyName(param) {
        const { unit, properties } = param;
        const unitKeyName = `${unit.name}-${properties.key}`;
        return { unitKeyName };
    }
}
exports.DomContainer = DomContainer;
DomContainer.units = {};
