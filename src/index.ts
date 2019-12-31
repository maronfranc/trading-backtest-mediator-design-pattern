import Backtest from "./application/backtest/Backtest";

const watchList: string[] = [
  "BTC_USDT",
  "ETH_BTC",
  "STR_USDT",
  "FCT_BTC",
  "BAT_ETH",
  "LTC_USDT",
  "TRX_BTC"
];

(async function() {
  const chartPromises = watchList.map(pair => {
    Backtest.chart(pair);
  });
  // Promise.all(chartPromises);
})();
