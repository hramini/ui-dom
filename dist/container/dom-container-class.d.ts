import { IDomContainerGetUnitIn, IDomContainerGetUnitOut } from './dom-container-interface';
export declare class DomContainer {
    private static readonly DOM_CONTAINER;
    private readonly units;
    private constructor();
    getUnit(param: IDomContainerGetUnitIn): IDomContainerGetUnitOut;
    private setUnit;
    private updateUnit;
    private checkUnitExistence;
    static getInstance(): DomContainer;
    private static updateUnitTag;
    private static getNewUpdateTag;
    private static getUnitKeyName;
}
