class Mediator {
  constructor(private handlers: any = []) {}

  addHandler(handler: any) {
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

  isValidHandler(handler: any) {
    return (
      typeof handler.canHandle === "function" &&
      typeof handler.handle === "function"
    );
  }

  request(index: any, value: any) {
    for (let i = 0; i < this.handlers.length; i++) {
      let handler: any = this.handlers[i];
      if (handler.canHandle(index, value)) {
        return handler.handle(index, value);
      }
    }
    return { pair: index, error: "Mediador não pôde satisfazer o request" };
  }
}
export default new Mediator();
