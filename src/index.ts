import Backtest from "./application/backtest/Backtest";

const watchList: string[] = ["BTC_USDT"];

(async function() {
  Backtest.ticker();
  
  // FIXME: Loop deve acontecer levando em conta o timestamp
  // watchList.forEach(async pair => {
  //   await Backtest.chart(pair);
  // });
})();
