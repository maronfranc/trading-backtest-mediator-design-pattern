import { Ticker } from "../interfaces";

class VolumeHandler {
  public canHandle(index: any, value: Ticker): boolean {
    return value.baseVolume > "9.7";
  }

  public handle(index: any, value: Ticker): any {
    return {
      pair: index,
      order: `Volume says: Buy ${index}!`
    };
  }
}
export default new VolumeHandler();