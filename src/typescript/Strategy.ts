export interface Strategy<T> {
  canHandle: (value: T) => boolean;
  handle: (index: string, value: T) => any;
}
