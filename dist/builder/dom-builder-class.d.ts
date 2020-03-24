import { VirtualDocument } from 'ui-wrapper';
import { IDomBuilderAppendChildrenIn, IDomBuilderCheckPropertyValueType } from './dom-builder-interface';
export declare abstract class DomBuilder {
    protected virtualDom: VirtualDocument;
    protected constructor();
    private checkChildren;
    protected checkPropertyValueType(param: IDomBuilderCheckPropertyValueType): boolean;
    protected appendChildren(param: IDomBuilderAppendChildrenIn): void;
}
