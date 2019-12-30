export interface Strategy<T> {
  canHandle: (value: T) => boolean;
  buyHandle: (index: string, value: T) => any;
  sellHandle: (index: string, value: T) => any;
}
