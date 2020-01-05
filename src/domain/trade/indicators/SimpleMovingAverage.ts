import Indicator from "./Indicator";
import sumArrayOfNumbers from "../../../utils/sumArrayOfNumbers";

export default class SimpleMovingAverage extends Indicator {
  constructor(period: number) {
    super(period);
  }

  calc() {
    const sum = sumArrayOfNumbers(this.arrValues);
    this.indicator = sum / this.arrValues.length;
  }
}
