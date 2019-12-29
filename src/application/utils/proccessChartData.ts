import Mediator from "../../domain/trade/Mediator";
import { ChartData } from "../../typescript";

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
