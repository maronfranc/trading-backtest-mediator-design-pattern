import Backtest from "./application/backtest/Backtest";

const watchList: string[] = [
  "BTC_USDT",
  "STR_USDT",
  "LTC_USDT",
  "ETH_BTC",
  "BAT_ETH",
  "FCT_BTC",
  "TRX_BTC"
];

(async function() {
  // FIXME: Loop deve acontecer levando em conta o timestamp
  // watchList.forEach(async pair => {
  //   await Backtest.chart(pair);
  // });
  // Promise.all(chartPromises);
  Backtest.ticker();
})();
