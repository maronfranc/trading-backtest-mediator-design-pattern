import { Ticker, Strategy } from "../interfaces";

class VolumeHandler implements Strategy {
  public canHandle(index: string, value: Ticker): boolean {
    return value.baseVolume > "9.7";
  }

  public handle(index: string, value: Ticker): any {
    return {
      pair: index,
      order: `Volume says: Buy ${index}!`
    };
  }
}
export default new VolumeHandler();
