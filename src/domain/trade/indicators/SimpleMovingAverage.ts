import Indicator from "./Indicator";
import sumArrayOfNumbers from "../../../utils/sumArrayOfNumbers";
import { average } from "../formulas/average";

export default class SimpleMovingAverage extends Indicator {
  constructor(period: number) {
    super(period);
  }

  calc() {
    this.indicator = average(this.arrValues);
  }
}
