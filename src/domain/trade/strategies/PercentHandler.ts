import { TickerData, Strategy } from "../../../typescript";

class PercentHandler implements Strategy<TickerData> {
  public canHandle(value: TickerData): boolean {
    return value.percentChange < "-0.12291480";
  }

  public handle(index: any, value: TickerData): any {
    return {
      pair: index,
      order: `Percent says: Buy ${index}!`
    };
  }
}
export default new PercentHandler();
