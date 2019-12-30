import { TradeData } from "./Trade";

class Portfolio {
  public currencies: Map<string, number> = new Map();
  constructor() {
    this.getCurrencies();
  }

  /**
   * confirmTrade é executado pelo Trade.ts depois de suas validações.
   */
  public confirmTrade({ toBuy, toSell, buyAmount, sellAmount }: TradeData) {
    this.currencies.set(toBuy, this.currencies.get(toBuy)! + buyAmount);
    this.currencies.set(toSell, this.currencies.get(toSell)! - sellAmount);
    console.log({ traded: `${toSell}:${sellAmount}-${toBuy}:${buyAmount}.` });
  }

  /**
   * Valores de teste para o portfólio inicial.
   */
  private getCurrencies() {
    this.currencies.set("USDT", 10000);
    // this.currencies.set("BTC", 0);
    // this.currencies.set("ETH", 0);
  }
}

export default new Portfolio();
