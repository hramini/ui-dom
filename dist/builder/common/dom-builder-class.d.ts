import { IBasicProperties } from 'ui-wrapper';
import { VirtualDocument } from 'virtual-document';
import { TDomElement } from '../../type/element-type';
import { IDomBuilderAppendChildrenToPropertiesIn, IDomBuilderCheckChildrenIn, IDomBuilderCheckChildrenOut, IDomBuilderCheckTypeOfIn, IDomBuilderCheckTypeOfOut } from './dom-builder-interface';
export declare abstract class DomBuilder {
    protected virtualDom: VirtualDocument;
    protected constructor();
    protected static checkTypeOf<T>(param: IDomBuilderCheckTypeOfIn<T>): IDomBuilderCheckTypeOfOut;
    protected static checkChildren(param: IDomBuilderCheckChildrenIn): IDomBuilderCheckChildrenOut;
    protected static appendChildrenToProperties<P extends IBasicProperties<TDomElement>>(param: IDomBuilderAppendChildrenToPropertiesIn<P>): void;
}
