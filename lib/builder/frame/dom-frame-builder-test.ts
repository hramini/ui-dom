import { VirtualDocument } from 'virtual-document';
import { DomUnitDemo } from '../../unit/dom-unit-demo-class';
import { IDomUnitDemoProps, IDomUnitDemoStates } from '../../unit/dom-unit-demo-interface';
import { DomFrameBuilder } from './dom-frame-builder-class';

describe('@DomFrameBuilder', (): void => {
  let doc: VirtualDocument;
  let domFrameBuilder: DomFrameBuilder;
  beforeAll((): void => {
    doc = new VirtualDocument();
    domFrameBuilder = new DomFrameBuilder();
  });

  describe('#buildElement', (): void => {
    const elementTagName: string = 'domunitdemo-unit';
    const domUnitDemoElementTagName: string = 'dom-unit-demo';
    const elementTitleAttribute: string = 'testTitle';
    const elementChild: string = 'testChild';
    const innerElementTagName: string = 'inner-test-tag';
    const innerElementInnerHtml: string = 'testChildInTheP';

    test(`expects an element without properties and children to have a ${elementTagName} tagName and an element with ${domUnitDemoElementTagName} inside`, (): void => {
      const { element } = domFrameBuilder.buildElement<IDomUnitDemoProps, IDomUnitDemoStates>({
        UnitConstructor: DomUnitDemo,
        properties: {}
      });
      const { tagName } = element;
      const {
        elementCollection: { length }
      } = VirtualDocument.findElementsByTagName({
        element,
        tagName: domUnitDemoElementTagName
      });

      expect(tagName.toLowerCase()).toBe(elementTagName);
      expect(length).toBe(1);
    });

    test(`expects an element with properties and without children to have an attribute with "title" as key and with ${elementTitleAttribute} as value`, (): void => {
      const {
        element: {
          children: { 0: firstElementChild }
        }
      } = domFrameBuilder.buildElement<IDomUnitDemoProps, IDomUnitDemoStates>({
        UnitConstructor: DomUnitDemo,
        properties: {
          title: elementTitleAttribute
        }
      });
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        attributeKey: 'title',
        element: firstElementChild as HTMLElement
      });

      expect(isFound).toBeTruthy();
      expect(attributeValue).toBe(elementTitleAttribute);
    });

    test(`expects an element with key properties and without children to have an attribute with "title" as key and with ${elementTitleAttribute} as value`, (): void => {
      const {
        element: {
          children: { 0: firstElementChild }
        }
      } = domFrameBuilder.buildElement<IDomUnitDemoProps, IDomUnitDemoStates>({
        UnitConstructor: DomUnitDemo,
        properties: {
          key: 1,
          title: elementTitleAttribute
        }
      });
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        attributeKey: 'title',
        element: firstElementChild as HTMLElement
      });

      expect(isFound).toBeTruthy();
      expect(attributeValue).toBe(elementTitleAttribute);
    });

    test(`expects an element without properties and with single children to its innerHTML be ${elementChild}`, (): void => {
      const {
        element: {
          children: {
            0: { innerHTML: firstElementChildInnerHtml }
          }
        }
      } = domFrameBuilder.buildElement<IDomUnitDemoProps, IDomUnitDemoStates>({
        UnitConstructor: DomUnitDemo,
        children: [elementChild],
        properties: {}
      });

      expect(firstElementChildInnerHtml).toBe(elementChild);
    });

    test(`expects an element without properties and with array children to its innerHTML be ${elementChild} + another element with ${innerElementTagName} tagName`, (): void => {
      const { element: childElement } = doc.createNewElement({ tagName: innerElementTagName });
      VirtualDocument.setInnerHtml({
        element: childElement,
        innerHtml: innerElementInnerHtml
      });
      const { element } = domFrameBuilder.buildElement<IDomUnitDemoProps, IDomUnitDemoStates>({
        UnitConstructor: DomUnitDemo,
        children: [elementChild, childElement],
        properties: {}
      });

      expect(element.children[0].innerHTML).toBe(
        `${elementChild}<${innerElementTagName}>${innerElementInnerHtml}</${innerElementTagName}>`
      );
    });

    test(`expects an element with both properties and children to innerHTML of its children be ${elementChild} and its children attribute value with "title" key be ${elementTitleAttribute}`, (): void => {
      const {
        element: {
          children: { 0: firstElementChild }
        }
      } = domFrameBuilder.buildElement<IDomUnitDemoProps, IDomUnitDemoStates>({
        UnitConstructor: DomUnitDemo,
        children: [elementChild],
        properties: {
          title: elementTitleAttribute
        }
      });
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        attributeKey: 'title',
        element: firstElementChild as HTMLElement
      });
      const { innerHTML: innerHtml } = firstElementChild;

      expect(isFound).toBeTruthy();
      expect(attributeValue).toBe(elementTitleAttribute);
      expect(innerHtml).toBe(elementChild);
    });
  });
});
