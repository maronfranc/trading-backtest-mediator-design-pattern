import { TickerData, Strategy, Order } from "../../../typescript";

class VolumeHandler implements Strategy<TickerData> {
  public canHandle(value: TickerData): boolean {
    return value.baseVolume > "9.7";
  }

  public buyHandle(index: string, value: TickerData): Order {
    return {
      pair: index,
      order: { buy: true }
    };
  }

  public sellHandle(index: string, value: TickerData): Order {
    return {
      pair: index,
      order: { sell: true }
    };
  }
}
export default new VolumeHandler();
