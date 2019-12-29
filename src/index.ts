import ApiCaller from "./services/ApiCaller";
import { TickerData, ChartData } from "./interfaces";
import { data } from "./data/tickerData";
import Mediator from "./trade/Mediator";
import { VolumeHandler, PercentHandler, MAxEMAHandler } from "./trade/strategies";
import { proccessTickerData } from "./utils/proccesTickerData";
import { proccessChartData } from "./utils/proccessChartData";
import { chartData } from "./data/chartData";

(async function() {
  try {
    // const ticker = await ApiCaller.getPoloniex<ChartData>("returnTicker");
    // console.log(ticker.data)

    /**
     * TickerData
     */
    // Mediator.addHandler(PercentHandler);
    // Mediator.addHandler(VolumeHandler);
    // proccessTickerData(data, Mediator)
  
    /**
     * ChartData
     */
    Mediator.addHandler(MAxEMAHandler);
    proccessChartData("BTC_ETH", chartData, Mediator);
    // Mediator.addHandler(MAHandler);

  } catch (e) {
    console.log('Error: ', e)
  }
})();
