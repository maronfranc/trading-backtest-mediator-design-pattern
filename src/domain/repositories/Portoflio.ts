class Portfolio {
  private currencies: Map<string, number> = new Map();
  constructor() {
    this.getCurrencies();
  }

  buy(pair: string, amount: number, price: number, fee: number = 0) {
    const toBuy = pair.split("_")[0];
    const toSell = pair.split("_")[1];

    if (this.currencies.get(toSell) === 0) {
      // console.log(`${toSell}:${this.currencies.get(toSell)} in your account.`);
    } else if (this.currencies.get(toSell)! - amount > 0) {
      this.comfirmTrade({ toBuy, toSell, amount, price });
    } else {
      // } else if (this.currencies.get(toSell)! - amount < 0 && this.currencies.get(toSell)! > 0) {
      this.comfirmTrade({
        toBuy,
        toSell,
        price,
        amount: this.currencies.get(toSell)!
      });
    }
  }

  private comfirmTrade({ toBuy, toSell, amount, price }: Trade) {
    if (!this.currencies.get(toBuy)) this.currencies.set(toBuy, 0);
    const boughtAmount = amount / price;
    this.currencies.set(toBuy, this.currencies.get(toBuy)! + boughtAmount);
    this.currencies.set(toSell, this.currencies.get(toSell)! - amount);
    console.log(`Traded ${toSell}:${amount}-${toBuy}:${boughtAmount}.`);
  }

  private getCurrencies() {
    this.currencies.set("BTC", 1);
    this.currencies.set("USDT", 1000);
    this.currencies.set("ETH", 5);
  }
}

export default new Portfolio();

interface Trade {
  toBuy: string;
  toSell: string;
  amount: number;
  price: number;
  fee?: number;
}
