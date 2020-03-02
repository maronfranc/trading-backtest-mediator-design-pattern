import Indicator from "./Indicator";

import exponentialMovingAverage from "../formulas/exponentialMovingAverage";

export default class ExponentialMovingAverage extends Indicator<number> {
  constructor(period: number) {
    super(period);
  }

  calc() {
    this.indicator = exponentialMovingAverage(this.arrValues, this.period);
  }
}
