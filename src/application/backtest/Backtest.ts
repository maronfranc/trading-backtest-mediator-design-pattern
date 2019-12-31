import Mediator from "../../domain/trade/Mediator";
import {
  MAxEMAHandler,
  PercentHandler,
  MAHandler,
  EMAcrossHandler
} from "../../domain/trade/strategies";
import { chartData } from "../../infrastructure/mock/chartData";
import { tickerData } from "../../infrastructure/mock/tickerData";
import { ChartData, TickerData } from "../../typescript";
import ApiCaller from "../services/ApiCaller";
import Portfolio from "../../domain/repositories/Portfolio";
import Trade from "../../domain/repositories/Trade";

class Backtest {
  async chart(pair: string) {
    try {
      const chart = await ApiCaller.getChartData({
        command: "returnChartData",
        pair,
        period: 14400
      });
      Mediator.addStrategy(EMAcrossHandler);
      Mediator.addStrategy(MAxEMAHandler);
      this.proccessArrayOfObjects(pair, chart.data, Mediator);
      console.log("Portfolio: ", Portfolio.currencies);
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
      const calculatedAmount = 115; // trade.calculateRisk();

      const trade = new Trade(Portfolio, pair);
      if (tradeReply.order.buy) {
        trade.buy(calculatedAmount, data.close);
      } else if (tradeReply.order.sell) {
        trade.sell(calculatedAmount, data.close);
      }
      return tradeReply;
    });
  }

  async ticker() {
    try {
      // const ticker = await ApiCaller.getTicker();
      // console.log(ticker.data);
      Mediator.addStrategy(PercentHandler);
      this.proccessObjectOfDictionaries(tickerData, Mediator);
    } catch (e) {
      console.log("Backtest Error: ", e);
    }
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
