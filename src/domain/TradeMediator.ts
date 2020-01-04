import { Order } from "../typescript/Order";

class TradeMediator {
  constructor(private handlers: any[] = []) {}

  /**
   * Adiciona uma estratégia na lista que vão ser executadas;
   * As estratégias adicionadas têm prioridade das primeiras pras ultimas
   * @example
   * TradeMediator.addStrategy(EMAcrossHandler); // false
   * TradeMediator.addStrategy(MAxEMAHandler);   // true : é executada
   * TradeMediator.addStrategy(MAHandler);       // true : não é executada
   * @see
   * https://jarrettmeyer.com/2016/04/21/mediator-pattern-in-javascript
   */
  addStrategy(handler: any) {
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
  request(pair: string, value: any): Order {
    for (let i = 0; i < this.handlers.length; i++) {
      let handler: any = this.handlers[i];
      if (handler.canHandle(value, handler.conditionTo)) {
        return handler.actionHandle(pair);
      }
    }
    return {
      pair,
      price: NaN,
      buy: false,
      sell: false,
      takeProfit: false,
      stopLimit: false,
      error: "Mediator was unable to satisfy request."
    };
  }

  private isValidHandler(handler: any) {
    return (
      typeof handler.canHandle === "function" &&
      typeof handler.actionHandle === "function"
    );
  }
}
export default new TradeMediator();
