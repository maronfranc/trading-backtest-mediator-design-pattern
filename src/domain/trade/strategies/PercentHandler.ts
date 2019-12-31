import { TickerData, Strategy, Order } from "../../../typescript";

class PercentHandler implements Strategy<TickerData> {
  /**
   * Ponto inicial para os metodos buyHandle e sellHandle, se false
   * eles não serão executados dentro do Mediator.request
   */
  public canHandle(value: TickerData): boolean {
    return value.percentChange < "-0.02";
  }

  public buyHandle(index: any, value: TickerData): Order {
    return {
      pair: index,
      order: { buy: true }
    };
  }

  public sellHandle(index: any, value: TickerData): Order {
    return {
      pair: index,
      order: { sell: true }
    };
  }
}
export default new PercentHandler();
