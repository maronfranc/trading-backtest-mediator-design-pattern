export default abstract class Indicator {
  protected arrValues: number[];
  public indicator: number;

  constructor(public period: number) {
    this.arrValues = [];
    this.indicator = 0;
  }

  push(n: number) {
    if (this.arrValues.length > this.period - 1) {
      this.arrValues.shift();
    }
    this.arrValues.push(n);
    this.calc();
  }

  abstract calc(): void;
}
