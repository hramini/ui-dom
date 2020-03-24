import { DomContainer } from './dom-container-class';

export class DomContainerDemo extends DomContainer {
  public static flushInstance(param: { name: string }): void {
    const { name } = param;
    delete this.units[name];
  }
}
