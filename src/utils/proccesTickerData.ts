import Mediator from "../trade/Mediator";
import { TickerData } from "../interfaces";

export function proccessTickerData(
  data: Record<string, TickerData>,
  mediator: typeof Mediator
) {
  return Object.entries(data).forEach(([index, values]) => {
    const tradeReply = mediator.request(index, values);
    console.log("tradeReply:", tradeReply);
  });
}
