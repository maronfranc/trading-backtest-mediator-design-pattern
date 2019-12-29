import axios, { AxiosInstance } from "axios";

class ApiCaller {
  async getPoloniex<Data>(command: string): Promise<any> {
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

// export type commandTypes = "returnTicker";
