import axios, { AxiosInstance } from "axios";
import { Dictionary } from "../interfaces";

class ApiCaller {
  // public get: <Data, Error = any>(
  //   ...args: Parameters<AxiosInstance["get"]>
  // ) => Promise<Dictionary<Data>>;
  // private axiosInstance: AxiosInstance;
  // constructor() {
  //   this.axiosInstance = axios.create({
  //     baseURL: "https://poloniex.com/public"
  //   });
  // }

  async getPoloniex<Data>(command: commandTypes): Promise<Dictionary<Data>> {
    let url = `https://poloniex.com/public?command=${command}`;
    try {
      const response = await axios.get(url);
      return response as any; // any: AxiosInstance Fudendo com tudo
    } catch (e) {
      throw new Error("Erro na requisisão: " + e)
    }
  }
}
export default new ApiCaller();

export type commandTypes = "returnTicker";
