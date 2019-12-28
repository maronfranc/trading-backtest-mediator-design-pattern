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

  request(price: any) {
    for (let i = 0; i < this.handlers.length; i++) {
      let handler: any = this.handlers[i];
      if (handler.canHandle(price)) {
        return handler.handle(price);
      }
    }
    // let error: any = new Error("Mediator was unable to satisfy request.");
    // error.request = price;
    // return error;
    console.log("ERROR: Mediador não pôde satisfazer a requisição")
  }
}
export default new Mediator();
