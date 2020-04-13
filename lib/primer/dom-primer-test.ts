import { VirtualDocument, VirtualDocumentDemo } from 'virtual-document';
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
    docDemo.createBase();
    domPrimer = new DomPrimer();
  });

  describe('#setElement', (): void => {
    test('expects to set value to "element" property', (): void => {
      const { element } = doc.makeElement({ tagName: domTagName });
      domPrimer.setElement({ element });
      const {
        element: { tagName: elementTagName }
      } = domPrimer;

      expect(elementTagName).toBe(domTagName);
    });
  });

  describe('#setTarget', (): void => {
    test('expects to set value to "target" property', (): void => {
      const { element: target } = doc.findElementById({ identifier: rootId });
      domPrimer.setTarget({ target });
      const {
        // eslint-disable-next-line id-length
        target: { id: targetId }
      } = domPrimer;

      expect(targetId).toBe(rootId);
    });
  });

  describe('#start', (): void => {
    test('expects to append element value into target', (): void => {
      const { element } = doc.makeElement({ tagName: domTagName });
      VirtualDocument.setId({ source: element, identifier: 'dom_element' });
      const { element: target } = doc.findElementById({ identifier: rootId });
      domPrimer.setElement({ element });
      domPrimer.setTarget({ target });
      domPrimer.start();

      const {
        isFound,
        element: { tagName }
      } = doc.findElementById({ identifier: 'dom_element' });
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
