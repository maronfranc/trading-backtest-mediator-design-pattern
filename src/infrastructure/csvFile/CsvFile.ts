import fs from "fs";
import path from "path";

import { createObjectCsvWriter } from "csv-writer";
import csv from "csv-parser";

import { CurrencyAmount } from "../../typescript/CurrencyAmount";
import Portfolio from "../repositories/Portfolio";

export default class CSVFile {
  private folderPath = path.join(__dirname, "../../../", "csv");
  private results: typeof Portfolio["currencies"] = new Map();
  private filePath: string;
  constructor(fileName: string) {
    this.filePath = `${this.folderPath}/${fileName}.csv`;
  }

  getPortfolio(): any {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .on("error", e => reject(e))
        .pipe(csv())
        .on("data", ({ currency, amount }) =>
          this.results.set(currency, +amount)
        )
        .on("end", () => {
          resolve(this.results);
        });
    }).catch(e => {
      console.error("CSVFile.getPortfolio catch:", e);
      throw new Error(e);
    });
  }

  async savePortfolio(portfolio: typeof Portfolio["currencies"]) {
    console.log("Portfolio: ", Portfolio.currencies);
    const csvWriter = createObjectCsvWriter({
      path: this.filePath,
      header: [
        { id: "currency", title: "currency" },
        { id: "amount", title: "amount" }
      ]
    });
    const records: CurrencyAmount[] = [];
    for (const [currency, amount] of portfolio)
      records.push({ currency, amount });

    try {
      await csvWriter.writeRecords(records);
    } catch (e) {
      console.log("CSVFile.savePorftolio catch: ", e);
    }
  }

  async deletePortfolio() {
    try {
      fs.unlinkSync(this.filePath);
    } catch (e) {
      console.log(e);
    }
  }
}
