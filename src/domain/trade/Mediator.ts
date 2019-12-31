import { Strategy } from "../../typescript";

class Mediator {
  constructor(private handlers: Strategy<any>[] = []) {}

  /**
   * Adiciona uma estratégia na lista que vão ser executadas;
   * As estratégias adicionadas têm prioridade das primeiras pras ultimas
   * @example
   * Mediator.addStrategy(EMAcrossHandler); // false
   * Mediator.addStrategy(MAxEMAHandler);   // true : é executada
   * Mediator.addStrategy(MAHandler);       // true : não é executada
   * @see 
   * https://jarrettmeyer.com/2016/04/21/mediator-pattern-in-javascript
   */
  addStrategy(handler: Strategy<any>) {
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

  /**
   * Executa as funções de todas as estratégias que foram adicionadas.
   */
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

  private isValidHandler(handler: Strategy<any>) {
    return (
      typeof handler.canHandle === "function" &&
      typeof handler.buyHandle === "function" &&
      typeof handler.sellHandle === "function"
    );
  }
}
export default new Mediator();
