import axios, { AxiosInstance } from "axios";

class ApiCaller {
  async getChartData({
    command,
    pair,
    period
  }: {
    command: commandNames;
    pair: string;
    period: AcceptedPeriod;
  }): Promise<any> {
    const host = "https://poloniex.com/public?";
    const now = new Date().getTime();
    const currencyPair = `currencyPair=${normalizePair(pair)}`;
    const query = `start=1546300800&end=${now}&period=${period}`;
    const url = `${host}command=${command}&${currencyPair}&${query}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      return response as any;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTicker() {
    const url = `https://poloniex.com/public?command=returnTicker`;
    console.log(url);
    try {
      const response = await axios.get(url);
      return response as any;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default new ApiCaller();

export type commandNames = "returnTicker" | "returnChartData";
type AcceptedPeriod = 300 | 900 | 1800 | 7200 | 14400 | 86400;

export function normalizePair(pair: string) {
  const splitPair = pair.split("_");
  return `${splitPair[1]}_${splitPair[0]}`;
}
