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
import ApiCaller, { t } from "../services/ApiCaller";
import Portfolio from "../../domain/repositories/Portfolio";
import Trade from "../../domain/repositories/Trade";

class Backtest {
  async chart(pair: string) {
    try {
      const chart = await ApiCaller.getChart<ChartData>({
        command: "returnChartData",
        pair,
        period: 14400
      });


      Mediator.addHandler(MAxEMAHandler);
      this.proccessArrayOfObjects(pair, chart.data, Mediator);
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

      const trade = new Trade(Portfolio, pair);
      const calculatedAmount = 115 // trade.calculateRisk();
      if (tradeReply.order.buy) {
        trade.buy(calculatedAmount, data.close)
        console.log("Buy:", Portfolio);
      } else if (tradeReply.order.sell) {
        trade.sell(calculatedAmount, data.close)
        console.log("Sell:", Portfolio);
      }
      return tradeReply;
    });
  }

  ticker() {
    try {
      // const picker = await ApiCaller.get<TickerData>("returnTicker")
      // console.log(picker.data)

      Mediator.addHandler(PercentHandler);
      Mediator.addHandler(VolumeHandler);
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
