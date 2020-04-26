import { IDomContainerGetInstanceOut, IDomContainerGetUnitIn, ITaggedUnit } from './dom-container-interface';
export declare class DomContainer {
    private static domContainer;
    private readonly units;
    private DomUnitConstructor;
    private properties;
    private constructor();
    extractUnit(param: IDomContainerGetUnitIn): ITaggedUnit;
    private setUnit;
    private updateUnit;
    private checkUnitExistence;
    private updateUnitTag;
    private getUnitKeyName;
    static getInstance(): IDomContainerGetInstanceOut;
    private static getNewUpdateTag;
}
