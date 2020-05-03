import { IDomContainerExtractUnitIn, IDomContainerGetInstanceOut, ITaggedUnit } from './dom-container-interface';
export declare class DomContainer {
    private static domContainer;
    private readonly units;
    private DomUnitConstructor;
    private properties;
    private constructor();
    extractUnit(param: IDomContainerExtractUnitIn): ITaggedUnit;
    private getUnits;
    private setUnit;
    private updateUnit;
    private checkUnitExistence;
    private updateUnitTag;
    private getUnitKeyName;
    static getInstance(): IDomContainerGetInstanceOut;
    private static getNewUpdateTag;
}
