export interface Strategy<T> {
  canHandle: (index: string, value: T) => boolean;
  handle: (index: string, value: T) => any;
}
