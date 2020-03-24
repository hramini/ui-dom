import { DomTagBuilder } from './dom-tag-builder-class';

describe('@DomTagBuilder', () => {
  let domTagBuilder: DomTagBuilder;
  beforeAll(() => {
    domTagBuilder = new DomTagBuilder();
  });

  describe('#buildElement', () => {
    test('testing buildElement without properties and children', () => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: null,
        children: []
      });

      expect(element.tagName.toLowerCase()).toBe('dom-tag-builder-test');
    });

    test('testing buildElement with simple properties and without children', () => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {
          testAttr: 'test-title-attr'
        },
        children: []
      });

      expect(element.getAttribute('testAttr')).toBe('test-title-attr');
    });

    test('testing buildElement with eventListener properties and without children', () => {
      let test = 'beforeClickText';
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: {
          onClick: () => {
            test = 'afterClickText';
          }
        },
        children: []
      });
      element.click();
      expect(test).toBe('afterClickText');
    });

    test('testing buildElement without properties and with simple string children', () => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: null,
        children: 'children-string-test'
      });
      expect(element.innerHTML).toBe('children-string-test');
    });

    test('testing buildElement without properties and with element children', () => {
      const { element: childElement } = domTagBuilder.buildElement({
        name: 'dom-tag-child',
        properties: null,
        children: []
      });
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: null,
        children: [childElement]
      });
      expect(element.children[0] && element.children[0].tagName.toLowerCase()).toBe(
        'dom-tag-child'
      );
    });

    test('testing buildElement without properties and with array of children', () => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag-builder-test',
        properties: null,
        children: ['firstChild', '-', 'secondChild']
      });
      expect(element.innerHTML).toBe('firstChild-secondChild');
    });

    test('testing buildElement with both properties and children', () => {
      const { element } = domTagBuilder.buildElement({
        name: 'dom-tag',
        properties: {
          name: 'domTag'
        },
        children: 'dom-tag-inner-text'
      });
      expect(element.outerHTML).toBe('<dom-tag name="domTag">dom-tag-inner-text</dom-tag>');
    });
  });
});
