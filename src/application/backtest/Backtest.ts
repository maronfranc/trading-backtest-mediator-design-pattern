import Mediator from "../../domain/trade/Mediator";
import {
  MAxEMAHandler,
  VolumeHandler,
  PercentHandler,
  MAHandler
} from "../../domain/trade/strategies";
import { chartData } from "../../infrastructure/mock/chartData";
import { tickerData } from "../../infrastructure/mock/tickerData";
import { ChartData, TickerData } from "../../typescript";
import ApiCaller from "../services/ApiCaller";

class Backtest {
  async chart(pair: string) {
    try {
      // const url =
      //   `returnChartData&currencyPair=${pair}&start=1546300800&end=1546646400&period=14400`;
      // const chart = await ApiCaller.getPoloniex<ChartData>(url);
      // console.log("api: ", chart.data);

      Mediator.addHandler(MAxEMAHandler);
      // Mediator.addHandler(MAHandler);
      this.proccessArrayOfObjects(pair, chartData, Mediator);
    } catch (e) {
      console.log("Backtest Error: ", e);
    }
  }

  ticker() {
    try {
      // const ticker = await ApiCaller.getPoloniex<ChartData>("returnTicker");
      // console.log(ticker.data)

      Mediator.addHandler(PercentHandler);
      Mediator.addHandler(VolumeHandler);
      this.proccessObjectOfDictionaries(tickerData, Mediator);
    } catch (e) {
      console.log("Backtest Error: ", e);
    }
  }

  proccessArrayOfObjects(
    pair: string,
    chartData: ChartData[],
    mediator: typeof Mediator
  ) {
    return chartData.forEach(data => {
      const tradeReply = mediator.request(pair, data);
      console.log("Backtest proccess:", tradeReply);
      return tradeReply;
    });
  }

  proccessObjectOfDictionaries(
    data: Record<string, TickerData>,
    mediator: typeof Mediator
  ) {
    return Object.entries(data).forEach(([index, values]) => {
      const tradeReply = mediator.request(index, values);
      console.log("Backtest proccess:", tradeReply);
      return tradeReply;
    });
  }
}
export default new Backtest();
