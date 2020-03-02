import Portfolio from "../../infrastructure/repositories/Portfolio";
import Csv from "../../infrastructure/csv/CsvFile";
import ApiCaller from "../../infrastructure/http/ApiCaller";

import Trade from "../../domain/trade/Trade";
import TradeMediator from "../../domain/TradeMediator";
import EMAcrossHandler from "../../domain/trade/strategies/chartDataStrategies/EMAcrossHandler";

import { ChartData } from "../../typescript/ChartData";

const fileName = "Chart Data Portfolio";

class ChartDataBacktest {
  async chart(pair: string) {
    try {
      TradeMediator.addStrategy(EMAcrossHandler);

      const chart = await ApiCaller.getChartData({
        command: "returnChartData",
        pair,
        period: 14400
      });

      await Portfolio.asyncConstructor(fileName);
      this.proccessArrayOfObjects(pair, chart.data, TradeMediator);

      new Csv(fileName).savePortfolio(Portfolio.currencies);
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
}
export default ChartDataBacktest;
