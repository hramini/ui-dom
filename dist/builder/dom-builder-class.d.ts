import { VirtualDocument } from 'virtual-document';
import { IDomBuilderCheckChildrenIn, IDomBuilderCheckChildrenOut, IDomBuilderCheckTypeOfIn, IDomBuilderCheckTypeOfOut } from './dom-builder-interface';
export declare abstract class DomBuilder {
    protected virtualDom: VirtualDocument;
    protected constructor();
    protected static checkTypeOf<T>(param: IDomBuilderCheckTypeOfIn<T>): IDomBuilderCheckTypeOfOut;
    protected static checkChildren(param: IDomBuilderCheckChildrenIn): IDomBuilderCheckChildrenOut;
}
