import Backtest from "./application/backtest/Backtest";

(async function() {
  const watchList: string[] = [
    "BTC_USDT",
    "ETH_BTC",
    "STR_USDT",
    "FCT_BTC",
    "BAT_ETH"
  ];

  const chartPromises = watchList.map(pair => {
    Backtest.chart(pair);
  });
  Promise.all(chartPromises);
})();
