import Indicator from "./Indicator";
import sumArrayOfNumbers from "../utils/sumArrayOfNumbers";
import exponentialMovingAverage from "../formulas/exponentialMovingAverage";

export default class ExponentialMovingAverage extends Indicator {
  constructor(period: number) {
    super(period);
  }

  calc() {
    this.indicator = exponentialMovingAverage(this.arrValues, this.period);
  }
}
