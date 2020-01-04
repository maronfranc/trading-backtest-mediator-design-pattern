import { TradeData } from "../../domain/trade/Trade";
import CSVFile from "../csv/CsvFile";

class Portfolio {
  currencies!: Map<string, number>;
  private portfolioFile!: CSVFile;
  constructor(fileName = "portfolio") {
    this.portfolioFile = new CSVFile(fileName);
  }
  async asyncConstructor(): Promise<void> {
    await this.getCurrencies();
  }

  /**
   * confirmTrade é executado pelo Trade.ts depois de suas validações.
   */
  confirmTrade({ toBuy, toSell, buyAmount, sellAmount }: TradeData) {
    this.currencies
      .set(toBuy, this.currencies.get(toBuy)! + buyAmount)
      .set(toSell, this.currencies.get(toSell)! - sellAmount);
    console.log({
      traded: `${toSell}:${sellAmount} for ${toBuy}:${buyAmount}.`
    });
  }

  /**
   * Busca valores dentro do arquivo `__dirname/csv/${fileName}.csv`.
   */
  private async getCurrencies(): Promise<any> {
    try {
      this.currencies = new Map(await this.portfolioFile.getPortfolio());
    } catch (e) {
      console.log("-----------------------------");
      console.log("Erro na Busca do arquivo .csv");
      console.log("Adicionado 100 USDT como valor de teste");
      this.currencies = new Map();
      return this.currencies.set("USDT", 100);
    }
  }

  save() {
    this.portfolioFile.savePortfolio(this.currencies);
  }
}

export default new Portfolio();
