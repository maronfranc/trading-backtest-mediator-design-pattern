import axios, { AxiosInstance } from "axios";
import { Dictionary } from "../interfaces";

class ApiCaller {
  async getPoloniex<Data>(command: commandTypes): Promise<Dictionary<Data>> {
    let url = `https://poloniex.com/public?command=${command}`;
    try {
      const response = await axios.get(url);
      return response as any;
    } catch (e) {
      throw new Error("Erro na requisição: " + e)
    }
  }
}
export default new ApiCaller();

export type commandTypes = "returnTicker";
