import Portfolio from "../../infrastructure/repositories/Portfolio";
import Csv from "../../infrastructure/csv/CsvFile";
import { chartData } from "../../infrastructure/mock/chartData";
import { tickerData } from "../../infrastructure/mock/tickerData";
import Trade from "../../domain/trade/Trade";
import { ChartData, TickerData } from "../../typescript";
import ApiCaller, { normalizePair } from "../../infrastructure/http/ApiCaller";
import TradeMediator from "../../domain/TradeMediator";
import {
  EMAcrossHandler,
  MAHandler,
  PercentHandler
} from "../../domain/trade/strategies";

class Backtest {
  async chart(pair: string) {
    try {
      TradeMediator.addStrategy(EMAcrossHandler);
      TradeMediator.addStrategy(MAHandler);
      // const chart = await ApiCaller.getChartData({
      //   command: "returnChartData",
      //   pair,
      //   period: 14400
      // });
      // await Portfolio.asyncConstructor();

      // this.proccessArrayOfObjects(pair, chart.data, TradeMediator);
      this.proccessArrayOfObjects(pair, chartData, TradeMediator);

      new Csv("portfolio").savePortfolio(Portfolio.currencies);
    } catch (e) {
      console.log("Backtest Error: ", e);
    }
  }

  proccessArrayOfObjects(
    pair: string,
    chartData: ChartData[],
    mediator: typeof TradeMediator
  ) {
    const trade = new Trade(Portfolio, pair);
    return chartData.forEach(data => {
      const tradeReply = mediator.request(pair, data);

      if (tradeReply.buy) trade.buy(data.close);
      else if (tradeReply.sell) trade.sell(data.close);
    });
  }

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
    // const ticker: {
    //   data: Record<string, TickerData>;
    // } = await ApiCaller.getTicker();
    return Object.entries(tickerData).forEach(([pair, data]) => {
      const normalizedPair = normalizePair(pair);
      const trade = new Trade(Portfolio, normalizedPair);
      const tradeReply = TradeMediator.request(normalizedPair, data);
      if (tradeReply.buy) trade.buy(+data.highestBid);
      else if (tradeReply.takeProfit) {
        console.error(`PROFIT bid:${data.highestBid}, pair:${normalizedPair}`);
        trade.buy(+data.highestBid);
      } else if (tradeReply.stopLimit) {
        console.log(`STOP ask:${data.lowestAsk}, pair:${normalizedPair}`);
        trade.sell(+data.lowestAsk);
      } else if (tradeReply.sell) trade.sell(+data.lowestAsk);
    });
  }
}
export default new Backtest();
