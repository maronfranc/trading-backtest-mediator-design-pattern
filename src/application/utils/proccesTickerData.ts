import Mediator from "../../domain/trade/Mediator";
import { TickerData } from "../../typescript";

export function proccessTickerData(
  data: Record<string, TickerData>,
  mediator: typeof Mediator
) {
  return Object.entries(data).forEach(([index, values]) => {
    const tradeReply = mediator.request(index, values);
    console.log("tradeReply:", tradeReply);
  });
}
