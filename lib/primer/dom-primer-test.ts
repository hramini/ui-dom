import { VirtualDocument } from 'ui-wrapper';
import { DomPrimer } from './dom-primer-class';

describe('@DomPrimer', () => {
  let doc: VirtualDocument;
  let domPrimer: DomPrimer;
  beforeAll(() => {
    doc = new VirtualDocument();
    doc.createBase();
    domPrimer = new DomPrimer();
  });

  describe('#start', () => {
    beforeAll(() => {
      const { element } = doc.makeElement({ tagName: 'dom-tag' });
      element.id = 'dom_element';
      const { element: target } = doc.findElementById({ id: 'root' });
      domPrimer.start({
        element,
        target
      });
    });

    test('testing the result of start method, by finding id', () => {
      const { element } = doc.findElementById({ id: 'dom_element' });
      expect(element.tagName).toBe('dom-tag');
    });

    test('testing the result of start method, by checking parentElement', () => {
      const { element } = doc.findParentElementByChildId({ id: 'dom_element' });
      expect(element.id).toBe('root');
    });
  });
});
