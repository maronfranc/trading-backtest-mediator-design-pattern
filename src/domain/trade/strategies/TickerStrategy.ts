import { riskReward } from "../formulas/riskReward";

import {
  actionTypes,
  ConditionToAction
} from "../../../typescript/ConditionToAction";
import { TickerData } from "../../../typescript/TickerData";
import { Order } from "../../../typescript/Order";

export abstract class TickerStrategy {
  protected action: actionTypes = "NONE";
  protected setOrderAt: number = NaN;
  protected stop: number = NaN;
  protected target: number = NaN;
  protected abstract conditionTo: ConditionToAction<TickerData>;
  /**
   * Ponto inicial para os metodos actionHandle, se false
   * ele não será executado dentro do TradeMediator.request
   */
  canHandle(
    value: TickerData,
    conditionToAction: ConditionToAction<TickerData>
  ): boolean {
    if (conditionToAction.buy(value)) {
      this.setOrderAt = +value.highestBid;
      [this.stop, this.target] = riskReward(value.highestBid);
      this.action = "BUY";

      if (conditionToAction.stopLimit(value)) this.action = "STOP_LIMIT";
      else if (conditionToAction.takeProfit(value)) this.action = "TAKE_PROFIT";
      return true;
    } else if (conditionToAction.sell(value)) {
      this.setOrderAt = +value.lowestAsk;
      [this.target, this.stop] = riskReward(this.setOrderAt);
      this.action = "SELL";

      if (conditionToAction.stopLimit(value)) this.action = "STOP_LIMIT";
      else if (conditionToAction.takeProfit(value)) this.action = "TAKE_PROFIT";
      return true;
    } else return false;
  }

  actionHandle(pair: string): Order {
    return {
      pair,
      price: this.setOrderAt,
      buy: this.action === "BUY",
      sell: this.action === "SELL",
      takeProfit: this.action === "TAKE_PROFIT",
      stopLimit: this.action === "STOP_LIMIT"
    };
  }
}
