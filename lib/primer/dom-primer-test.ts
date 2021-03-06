import { VirtualDocument, VirtualDocumentDemo } from 'virtual-document';
import { DomUnit } from '../unit/dom-unit-class';
import { DomPrimer } from './dom-primer-class';

describe('@DomPrimer', (): void => {
  let doc: VirtualDocument;
  let docDemo: VirtualDocumentDemo;
  let domPrimer: DomPrimer;
  const domTagName: string = 'dom-tag';
  const rootId: string = 'root';

  beforeEach((): void => {
    doc = new VirtualDocument();
    docDemo = new VirtualDocumentDemo({ virtualDocument: doc });
    domPrimer = new DomPrimer();

    docDemo.createBase();
  });

  describe('#getUnitPrototype', (): void => {
    test('expects the return value to be match with prototype of @DomUnit', (): void => {
      const { unitPrototype } = domPrimer.getUnitPrototype();

      expect(unitPrototype).toMatchObject(DomUnit.prototype);
    });
  });

  describe('#setElement', (): void => {
    test('expects to set value to "element" property', (): void => {
      const { element: createdElement } = doc.createNewElement({ tagName: domTagName });

      domPrimer.setElement({ element: createdElement });

      const { element } = domPrimer;
      const { tagName } = element;

      expect(tagName).toBe(domTagName);
    });
  });

  describe('#setTarget', (): void => {
    test('expects to set value to "target" property', (): void => {
      const { element: rootElement } = doc.findElementById({ elementId: rootId });

      domPrimer.setTarget({ target: rootElement });

      const { target } = domPrimer;
      // eslint-disable-next-line id-length
      const { id: targetId } = target;

      expect(targetId).toBe(rootId);
    });
  });

  describe('#start', (): void => {
    test('expects to append element value into target', (): void => {
      const { element } = doc.createNewElement({ tagName: domTagName });

      VirtualDocument.setId({ element, identifier: 'dom_element' });

      const { element: target } = doc.findElementById({ elementId: rootId });

      domPrimer.setElement({ element });
      domPrimer.setTarget({ target });
      domPrimer.start();

      const {
        isFound,
        element: { tagName }
      } = doc.findElementById({ elementId: 'dom_element' });
      const {
        isFound: isParentFound,
        // eslint-disable-next-line id-length
        parentElement: { id: parentElementId }
      } = VirtualDocument.getParentElement({ element });

      expect(isFound).toBeTruthy();
      expect(tagName).toBe('dom-tag');
      expect(isParentFound).toBeTruthy();
      expect(parentElementId).toBe('root');
    });
  });
});
