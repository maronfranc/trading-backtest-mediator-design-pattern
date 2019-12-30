import { Strategy } from "../../typescript";

class Mediator {
  constructor(private handlers: Strategy<any>[] = []) {}

  addHandler(handler: Strategy<any>) {
    if (this.isValidHandler(handler)) {
      this.handlers.push(handler);
      return this;
    }
    let error: any = new Error(
      "Attempt to register an invalid handler with the mediator."
    );
    error.handler = handler;
    throw error;
  }

  isValidHandler(handler: Strategy<any>) {
    return (
      typeof handler.canHandle === "function" &&
      typeof handler.buyHandle === "function" &&
      typeof handler.sellHandle === "function"
    );
  }

  request(index: string, value: any) {
    for (let i = 0; i < this.handlers.length; i++) {
      let handler: Strategy<any> = this.handlers[i];
      if (handler.canHandle(value)) {
        return handler.buyHandle(index, value);
      } else {
        return handler.sellHandle(index, value);
      }
    }
    return { pair: index, error: "Mediator was unable to satisfy request." };
  }
}
export default new Mediator();
