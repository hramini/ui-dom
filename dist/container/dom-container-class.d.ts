import { IDomContainerGetUnitIn, IDomContainerGetUnitOut, UnitInstance } from './dom-container-interface';
export declare class DomContainer {
    protected static units: UnitInstance;
    static getUnit(param: IDomContainerGetUnitIn): IDomContainerGetUnitOut;
    private static setUnit;
    private static updateUnit;
    private static updateUnitTag;
    private static checkUnitExistence;
    private static getNewUpdateTag;
    private static getUnitKeyName;
}
