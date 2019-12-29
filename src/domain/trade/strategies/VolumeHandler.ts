import { TickerData, Strategy } from "../../../typescript";

class VolumeHandler implements Strategy<TickerData> {
  public canHandle(index: string, value: TickerData): boolean {
    return value.baseVolume > "9.7";
  }

  public handle(index: string, value: TickerData): any {
    return {
      pair: index,
      order: `Volume says: Buy ${index}!`
    };
  }
}
export default new VolumeHandler();
