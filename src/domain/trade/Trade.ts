import Portfolio from "../../infrastructure/repositories/Portfolio";

class Trade {
  private currencyName: Record<CurrencyPair, string>;
  constructor(
    private portfolio: typeof Portfolio,
    private pair: string,
    // private price: number,
    private fee: number = 0
  ) {
    this.currencyName = {
      main: this.pair.split("_")[0],
      secondary: this.pair.split("_")[1]
    };
  }

  buy(price: number) {
    this.notUndefinedCurrencies();
    const amount = this.calculateRisk(
      this.portfolio.currencies.get(this.currencyName.secondary)!
    );
    const buyAmount = amount / price;
    this.validate({
      toBuy: this.currencyName.main,
      toSell: this.currencyName.secondary,
      buyAmount,
      sellAmount: amount
    });
  }

  sell(price: number) {
    this.notUndefinedCurrencies();
    const amount = this.calculateRisk(
      this.portfolio.currencies.get(this.currencyName.main)!
    );
    const sellAmount = amount / price;
    this.validate({
      toBuy: this.currencyName.secondary,
      toSell: this.currencyName.main,
      buyAmount: amount,
      sellAmount
    });
  }

  calculateRisk(amount: number, percentage: number = 0.03): number {
    return amount * percentage;
  }

  private validate({ toBuy, toSell, buyAmount, sellAmount }: TradeData) {
    this.notUndefinedCurrencies();

    if (this.portfolio.currencies.get(toSell) === 0) {
      // console.info("// Valor zerado")
    } else if (this.portfolio.currencies.get(toSell)! - sellAmount > 0) {
      // console.log(toBuy, toSell,)
      // console.info("// Procede normalmente")
      this.portfolio.confirmTrade({ toBuy, toSell, sellAmount, buyAmount });
    } else {
      // console.log(toBuy, toSell,)
      // console.info("// Compra pra zerar")
      const remainingAmount = this.portfolio.currencies.get(toSell)!;
      this.portfolio.confirmTrade({
        toBuy,
        toSell,
        sellAmount: remainingAmount,
        buyAmount
      });
    }
  }

  private notUndefinedCurrencies() {
    if (!this.portfolio.currencies.has(this.currencyName.main))
      this.portfolio.currencies.set(this.currencyName.main, 0);
    if (!this.portfolio.currencies.has(this.currencyName.secondary))
      this.portfolio.currencies.set(this.currencyName.secondary, 0);
  }
}

export default Trade;

type CurrencyPair = "main" | "secondary";

export interface TradeData {
  toBuy: string;
  buyAmount: number;
  toSell: string;
  sellAmount: number;
  fee?: number;
}
