import Mediator from "../../domain/trade/Mediator";
import { MAxEMAHandler, VolumeHandler, PercentHandler, MAHandler } from "../../domain/trade/strategies";
import { chartData } from "../../infrastructure/data/chartData";
import { proccessChartData, proccessTickerData } from "../utils";
import { tickerData } from "../../infrastructure/data/tickerData";
import ApiCaller from "../services/ApiCaller";
import { ChartData } from "../../typescript";

export default class Backtest {
  async run() {
    try {
      // const ticker = await ApiCaller.getPoloniex<ChartData>("returnTicker");
      // console.log(ticker.data)

      /**
       * TickerData
       */
      // Mediator.addHandler(PercentHandler);
      // Mediator.addHandler(VolumeHandler);
      // proccessTickerData(tickerData, Mediator)

      // /**
      //  * ChartData
      //  */
      Mediator.addHandler(MAHandler);
      Mediator.addHandler(MAxEMAHandler);
      proccessChartData("BTC_ETH", chartData, Mediator);
    } catch (e) {
      console.log("Error: ", e);
    }
  }
}
