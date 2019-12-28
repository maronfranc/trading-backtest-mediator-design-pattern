// import axios from "axios";
// import ApiCaller from "./services/ApiCaller";
import { Ticker } from "./interfaces";
import { data } from "./data";
import Mediator from "./strategies/Mediator";
import { VolumeHandler, PercentHandler } from "./strategies";

(async function() {
  // try {
  //   const tickerData = await ApiCaller.getPoloniex<Ticker>("returnTicker");
  //   console.log(tickerData)
  // } catch (e) {
  //   console.log('Error: ', e)
  // }

  Mediator.addHandler(PercentHandler);
  Mediator.addHandler(VolumeHandler);

  Object.entries(data).forEach(([index, values]) => {
    let tradeReply = Mediator.request(index, values);
    console.log("tradeReply:", tradeReply);
  });
})();
