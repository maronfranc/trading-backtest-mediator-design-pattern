import axios, { AxiosInstance } from "axios";

class ApiCaller {
  async getChart<Data>(
    {
      command,
      pair,
      period
    }: {
      command: commandTypes;
      pair: string;
      period: PeriodTypes;
    } // : Promise<{ // data: Data;
  ) // }>
  {
    const host = "https://poloniex.com/public?";
    const now = new Date().getTime();
    const normalizedPair = `currencyPair=${pair.split("_")[1]}_${
      pair.split("_")[0]
    }`;
    const query = `start=1546300800&end=${now}&period=${period}`;
    const url = `${host}command=${command}&${normalizedPair}&${query}`;
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
    try {
      const response = await axios.get(url);
      return response as any;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default new ApiCaller();

export type commandTypes = "returnTicker" | "returnChartData";
type PeriodTypes = 300 | 900 | 1800 | 7200 | 14400 | 86400;

export const t: Record<string, PeriodTypes> = {
  minutes5: 300,
  minutes15: 900,
  minutes30: 1800,
  hours2: 7200,
  hours4: 14400,
  day: 86400
};
