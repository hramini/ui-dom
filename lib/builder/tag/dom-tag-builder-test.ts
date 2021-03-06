/* eslint-disable @typescript-eslint/indent */
import { VirtualDocument } from 'virtual-document';
import { IDomBuilderDemoProperties } from '../common/dom-builder-demo-interface';
import { DomTagBuilder } from './dom-tag-builder-class';

describe('@DomTagBuilder', (): void => {
  let domTagBuilder: DomTagBuilder;

  beforeAll((): void => {
    domTagBuilder = new DomTagBuilder();
  });

  describe('#buildElement', (): void => {
    const domTagName: string = 'dom-tag-builder-test';
    const nameAttribute: string = 'test-title-attr';
    const elementInnerHtmlText: string = 'children-string-test';
    const elementInnerHtmlTextFirst: string = 'children-string-test-first';
    const elementInnerHtmlTextSecond: string = 'children-string-test-second';

    test(`expects to build an element without properties and children having ${domTagName} as tagName`, (): void => {
      const {
        element: { tagName: elementTagName }
      } = domTagBuilder.buildElement({
        name: domTagName,
        properties: {}
      });

      expect(elementTagName.toLowerCase()).toBe(domTagName);
    });

    test(`expects to build an element with simple properties and without children having "${nameAttribute}" as an attribute with "name" key`, (): void => {
      const { element } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        name: domTagName,
        properties: {
          name: nameAttribute
        }
      });
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        attributeKey: 'name',
        element
      });

      expect(isFound).toBeTruthy();
      expect(attributeValue).toBe(nameAttribute);
    });

    test('expects to build an element with eventListener properties and without children having a click event listener', (): void => {
      const afterText: string = 'afterClickText';
      let testText: string = 'beforeClickText';
      const { element } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        name: domTagName,
        properties: {
          onClick: (): void => {
            testText = afterText;
          }
        }
      });

      element.click();

      expect(testText).toBe(afterText);
    });

    test(`expects to build an element without properties and with simple children having "${elementInnerHtmlText}" as inner html of element`, (): void => {
      const {
        element: { innerHTML: elementInnerHtml }
      } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        children: [elementInnerHtmlText],
        name: domTagName,
        properties: {}
      });

      expect(elementInnerHtml).toBe(elementInnerHtmlText);
    });

    test(`expects to build an element without properties and with element children having an element in its children with "${domTagName}" tagName`, (): void => {
      const { element: childElement } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        children: [],
        name: domTagName,
        properties: {}
      });
      const {
        element: {
          children: {
            0: { tagName }
          }
        }
      } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        children: [childElement],
        name: 'dom-tag-parent',
        properties: {}
      });

      expect(tagName.toLowerCase()).toBe(domTagName);
    });

    test(`expects to build an element without properties and with simple children having "${elementInnerHtmlTextFirst}-${elementInnerHtmlTextSecond}" as inner html of element`, (): void => {
      const {
        element: { innerHTML: elementInnerHtml }
      } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        children: [elementInnerHtmlTextFirst, '-', elementInnerHtmlTextSecond],
        name: domTagName,
        properties: {}
      });

      expect(elementInnerHtml).toBe(`${elementInnerHtmlTextFirst}-${elementInnerHtmlTextSecond}`);
    });

    test(`expects to build an element with both properties and children having "${nameAttribute}" as an attribute with "name" key and "${elementInnerHtmlText}" as inner html of element`, (): void => {
      const { element } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        children: [elementInnerHtmlText],
        name: domTagName,
        properties: {
          name: nameAttribute
        }
      });
      const { tagName: elementTagName, innerHTML: elementInnerHtml } = element;
      const { isFound, attributeValue: nameAttributeValue } = VirtualDocument.findAttribute({
        attributeKey: 'name',
        element
      });

      expect(elementTagName.toLowerCase()).toBe(domTagName);
      expect(elementInnerHtml).toBe(elementInnerHtmlText);
      expect(isFound).toBeTruthy();
      expect(nameAttributeValue).toBe(nameAttribute);
    });

    test(`expects to build an element with children property and without children do not having any attribute with "children" key and "${elementInnerHtmlText}" as inner html of element`, (): void => {
      const { element } = domTagBuilder.buildElement<IDomBuilderDemoProperties>({
        name: domTagName,
        properties: {
          children: [elementInnerHtmlText]
        }
      });
      const { isFound } = VirtualDocument.findAttribute({
        attributeKey: 'children',
        element
      });
      const { innerHTML: elementInnerHtml } = element;

      expect(isFound).toBeFalsy();
      expect(elementInnerHtml).toBe(elementInnerHtmlText);
    });
  });
});
