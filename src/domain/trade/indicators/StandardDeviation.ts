import Indicator from "./Indicator";

import { average } from "../formulas/average";

export default class StandarDeviation extends Indicator<number> {
  constructor(period: number) {
    super(period);
  }

  calc() {
    const avg = average(this.arrValues);
    const differenceSquare = this.arrValues.map((value): number => {
      return Math.pow(value - avg, 2);
    }, 0);
    const sumSquareDifference = differenceSquare.reduce((acc, value) => {
      return acc + value;
    });
    const variance = sumSquareDifference / this.arrValues.length;
    this.indicator = Math.sqrt(variance);
  }
}
