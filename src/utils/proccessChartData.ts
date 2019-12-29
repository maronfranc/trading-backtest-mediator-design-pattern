import Mediator from "../trade/Mediator";
import { ChartData } from "../interfaces";

export function proccessChartData(
  pair: string,
  chartData: ChartData[],
  mediator: typeof Mediator
) {
  return chartData.forEach(data => {
    const tradeReply = mediator.request(pair, data);
    console.log("tradeReply:", tradeReply);
  });
}
