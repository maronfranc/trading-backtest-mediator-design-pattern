import Indicator from "./Indicator";

import { average } from "../formulas/average";

export default class SimpleMovingAverage extends Indicator<number> {
  constructor(period: number) {
    super(period);
  }

  calc() {
    this.indicator = average(this.arrValues);
  }
}
