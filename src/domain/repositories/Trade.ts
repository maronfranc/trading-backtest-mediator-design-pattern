
class Trade {
  private currencyName: Record<CurrencyPair, string>;
  constructor(
    private portfolio: any,
    private pair: string,
    // private price: number,
    private fee: number = 0
  ) {
    this.currencyName = {
      main: this.pair.split("_")[0],
      secondary: this.pair.split("_")[1]
    };
  }

  buy(amount: number, price: number) {
    const buyAmount = amount / price;
    this.validate({
      toBuy: this.currencyName.main,
      toSell: this.currencyName.secondary,
      buyAmount,
      sellAmount: amount
    });
  }

  sell(amount: number, price: number) {
    const sellAmount = amount / price;
    this.validate({
      toBuy: this.currencyName.secondary,
      buyAmount: amount,
      toSell: this.currencyName.main,
      sellAmount
    });
  }

  private validate({ toBuy, toSell, buyAmount, sellAmount }: TradeData) {
    this.notUndefinedCurrencies();

    if (this.portfolio.currencies.get(toSell) === 0) {
      // Valor zerado
    } else if (this.portfolio.currencies.get(toSell)! - sellAmount > 0) {
      // Procede normalmente
      this.portfolio.confirmTrade({ toBuy, toSell, sellAmount, buyAmount });
    } else {
      // Compra pra zerar
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
  sellAmount: number;
  toSell: string;
  fee?: number;
}