import Portfolio from "../../infrastructure/repositories/Portfolio";
import Csv from "../../infrastructure/csvFile/CsvFile";
import { chartData } from "../../infrastructure/mock/chartData";
import { tickerData } from "../../infrastructure/mock/tickerData";
import TradeMediator from "../../domain/TradeMediator";
import {
  MAxEMAHandler,
  PercentHandler,
  MAHandler,
  EMAcrossHandler
} from "../../domain/trade/strategies";
import Trade from "../../domain/trade/Trade";
import { ChartData, TickerData } from "../../typescript";
import ApiCaller from "../../infrastructure/http/ApiCaller";

class Backtest {
  // async chart(pair: string) {
  //   try {
  //     TradeMediator.addStrategy(MAxEMAHandler);
  //     TradeMediator.addStrategy(EMAcrossHandler);
  //     const chart = await ApiCaller.getChartData({
  //       command: "returnChartData",
  //       pair,
  //       period: 14400
  //     });
  //     this.proccessArrayOfObjects(pair, chart.data, TradeMediator);
  //     // this.proccessArrayOfObjects(pair, chartData, TradeMediator);
  //     console.log("Portfolio: ", Portfolio.currencies);
  //   } catch (e) {
  //     console.log("Backtest Error: ", e);
  //   }
  // }

  // proccessArrayOfObjects(
  //   pair: string,
  //   chartData: ChartData[],
  //   mediator: typeof TradeMediator
  // ) {
  //   const trade = new Trade(Portfolio, pair);
  //   return chartData.forEach(data => {
  //     const tradeReply = mediator.request(pair, data);

  //     if (tradeReply.order.buy) trade.buy(data.close);
  //     else if (tradeReply.order.sell) trade.sell(data.close);
  //   });
  // }

  async ticker() {
    try {
      TradeMediator.addStrategy(PercentHandler);
      
      await Portfolio.asyncConstructor();
      await this.proccessObjectOfDictionary();

      new Csv("portfolio").savePortfolio(Portfolio.currencies);
    } catch (e) {
      console.log("Backtest catch: ", e);
    }
  }

  async proccessObjectOfDictionary() {
    const ticker: {data: Record<string, TickerData>} = await ApiCaller.getTicker();
    return Object.entries(ticker.data).forEach(([pair, data]) => {
      const normalizedPair = pair.split("_")[1] + "_" + pair.split("_")[0];
      const trade = new Trade(Portfolio, normalizedPair);
      const tradeReply = TradeMediator.request(normalizedPair, data);
      if (tradeReply.order.buy) trade.buy(+data.highestBid);
      else if (tradeReply.order.sell) trade.sell(+data.lowestAsk);
    });
  }
}
export default new Backtest();
