declare module '@shopify/draggable' {
  export class Swappable {
    constructor(c: NodeListOf<Element>, options: any);
    destroy(): void;
    on(e: string, v: Function);
  }
  export interface DragStartEvent {}
  export const Plugins;
}
