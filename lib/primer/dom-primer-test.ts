import { VirtualDocument, VirtualDocumentDemo } from 'virtual-document';
import { DomPrimer } from './dom-primer-class';

describe('@DomPrimer', (): void => {
  let doc: VirtualDocument;
  let docDemo: VirtualDocumentDemo;
  let domPrimer: DomPrimer;
  beforeAll((): void => {
    doc = new VirtualDocument();
    docDemo = new VirtualDocumentDemo({ virtualDocument: doc });
    docDemo.createBase();
    domPrimer = new DomPrimer();
  });

  describe('#start', (): void => {
    test('testing the result of start method, by finding id', (): void => {
      const { element } = doc.makeElement({ tagName: 'dom-tag' });
      VirtualDocument.setId({ source: element, identifier: 'dom_element' });
      const { element: target } = doc.findElementById({ identifier: 'root' });
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
