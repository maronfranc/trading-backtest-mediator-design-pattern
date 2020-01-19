import { TradeData } from "../../domain/trade/Trade";
import CSVFile from "../csv/CsvFile";

class Portfolio {
  currencies!: Map<string, number>;
  private portfolioFile!: CSVFile;
  async asyncConstructor(fileName = "portfolio"): Promise<void> {
    this.portfolioFile = new CSVFile(fileName);
    await this.getCurrencies();
  }

  /**
   * confirmTrade é executado pelo Trade.ts depois de suas validações.
   */
  confirmTrade({ toBuy, toSell, buyAmount, sellAmount }: TradeData) {
    this.currencies
      .set(toBuy, this.currencies.get(toBuy)! + buyAmount)
      .set(toSell, this.currencies.get(toSell)! - sellAmount);
    console.info({
      traded: `${toSell}:${sellAmount} for ${toBuy}:${buyAmount}.`
    });
  }

  /**
   * Busca valores dentro do arquivo `__dirname/csv/${fileName}.csv`.
   */
  private async getCurrencies(): Promise<void> {
    try {
      this.currencies = new Map(await this.portfolioFile.getPortfolio());
    } catch (e) {
      console.info("-----------------------------");
      console.info("Erro na Busca do arquivo .csv");
      console.info("Adicionado 100 USDT como valor de teste");
      this.currencies = new Map();
      this.currencies.set("USDT", 100);
    }
  }

  save() {
    this.portfolioFile.savePortfolio(this.currencies);
  }
}

export default new Portfolio();
