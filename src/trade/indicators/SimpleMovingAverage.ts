export default class MA {
  public arrValues: number[] = [];
  public value: number = 0;

  constructor(public period: number) {}

  push(n: number) {
    if (this.arrValues.length > this.period - 1) {
      this.arrValues.shift();
    }
    this.arrValues.push(n);
    this.calcMA();
  }

  calcMA() {
    const sum = this.arrValues.reduce((acc: number, value: number): number => {
      return acc + value;
    }, 0);
    this.value = sum / this.arrValues.length;
  }
}
