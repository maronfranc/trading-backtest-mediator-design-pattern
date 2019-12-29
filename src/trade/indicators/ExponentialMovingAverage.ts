export default class EMA {
  public arrValues: number[] = [];
  public value: number = 0;

  constructor(public period: number) {}

  push(n: number) {
    if (this.arrValues.length > this.period - 1) {
      this.arrValues.shift();
    }
    this.arrValues.push(n);
    this.calcEMA();
  }

  calcEMA() {
    const sum = this.arrValues.reduce((acc: number, value: number): number => {
      return acc + value;
    }, 0);
    this.value = sum / this.arrValues.length;
  }
}
