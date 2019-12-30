import { TickerData, Strategy, Order } from "../../../typescript";

class PercentHandler implements Strategy<TickerData> {
  public canHandle(value: TickerData): boolean {
    return value.percentChange < "-0.12291480";
  }

  public buyHandle(index: any, value: TickerData): Order {
    return {
      pair: index,
      order: {buy: true}
    };
  }

  public sellHandle(index: any, value: TickerData): Order {
    return {
      pair: index,
      order: {sell: true}
    };
  }
}
export default new PercentHandler();
