import Portfolio from "../../infrastructure/repositories/Portfolio";
import Csv from "../../infrastructure/csv/CsvFile";
import ApiCaller, { normalizePair } from "../../infrastructure/http/ApiCaller";

import Trade from "../../domain/trade/Trade";
import TradeMediator from "../../domain/TradeMediator";
import { PercentHandler } from "../../domain/trade/strategies";

import { TickerData } from "../../typescript";

const fileName = "Ticker Portfolio";

class TickerBacktest {
  async ticker() {
    try {
      TradeMediator.addStrategy(PercentHandler);

      await Portfolio.asyncConstructor(fileName);
      await this.proccessObjectOfDictionary();

      new Csv(fileName).savePortfolio(Portfolio.currencies);
    } catch (e) {
      console.log("Backtest catch: ", e);
    }
  }

  async proccessObjectOfDictionary() {
    const ticker: {
      data: Record<string, TickerData>;
    } = await ApiCaller.getTicker();
    return Object.entries(ticker.data).forEach(([pair, data]) => {
      const normalizedPair = normalizePair(pair);

      const trade = new Trade(Portfolio, normalizedPair);
      const tradeReply = TradeMediator.request(normalizedPair, data);
      
      if (tradeReply.buy) trade.buy(+data.highestBid);
      else if (tradeReply.takeProfit) trade.buy(+data.highestBid);
      else if (tradeReply.stopLimit) trade.sell(+data.lowestAsk);
      else if (tradeReply.sell) trade.sell(+data.lowestAsk);
    });
  }
}

export default TickerBacktest;
