import { IDomContainerGetInstanceOut, IDomContainerGetUnitIn, IDomContainerGetUnitOut } from './dom-container-interface';
export declare class DomContainer {
    private static domContainer;
    private readonly units;
    private constructor();
    getUnit(param: IDomContainerGetUnitIn): IDomContainerGetUnitOut;
    private setUnit;
    private updateUnit;
    private checkUnitExistence;
    static getInstance(): IDomContainerGetInstanceOut;
    private static updateUnitTag;
    private static getNewUpdateTag;
    private static getUnitKeyName;
}
