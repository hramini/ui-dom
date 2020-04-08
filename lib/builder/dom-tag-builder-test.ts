import { DomTagBuilder } from './dom-tag-builder-class';

describe('@DomTagBuilder', (): void => {
  let domTagBuilder: DomTagBuilder;
  beforeAll((): void => {
    domTagBuilder = new DomTagBuilder();
  });

  describe('#buildElement', (): void => {
    test('testing buildElement without properties and children', (): void => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {},
        children: []
      });

      expect(element.tagName.toLowerCase()).toBe('dom-tag-builder-test');
    });

    test('testing buildElement with simple properties and without children', (): void => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {
          testAttr: 'test-title-attr'
        },
        children: []
      });

      expect(element.getAttribute('testAttr')).toBe('test-title-attr');
    });

    test('testing buildElement with eventListener properties and without children', (): void => {
      let test: string = 'beforeClickText';
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {
          onClick: (): void => {
            test = 'afterClickText';
          }
        },
        children: []
      });
      element.click();
      expect(test).toBe('afterClickText');
    });

    test('testing buildElement without properties and with simple string children', (): void => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {},
        children: ['children-string-test']
      });
      expect(element.innerHTML).toBe('children-string-test');
    });

    test('testing buildElement without properties and with element children', (): void => {
      const { element: childElement } = domTagBuilder.buildElement({
        name: 'dom-tag-child',
        properties: {},
        children: []
      });
      const {
        element: {
          children: {
            0: { tagName }
          }
        }
      } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {},
        children: [childElement]
      });
      expect(tagName.toLowerCase()).toBe('dom-tag-child');
    });

    test('testing buildElement without properties and with array of children', (): void => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {},
        children: ['firstChild', '-', 'secondChild']
      });
      expect(element.innerHTML).toBe('firstChild-secondChild');
    });

    test('testing buildElement with both properties and children', (): void => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag',
        properties: {
          name: 'domTag'
        },
        children: ['dom-tag-inner-text']
      });
      expect(element.outerHTML).toBe('<dom-tag name="domTag">dom-tag-inner-text</dom-tag>');
    });
  });
});
