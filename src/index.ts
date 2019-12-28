// import axios from "axios";
// import ApiCaller from "./services/ApiCaller";
import { Ticker } from "./interfaces";
import { data } from "./data";
import Mediator from "./strategies/Mediator";
import { VolumeHandler, PercentHandler } from './strategies';

(async function() {
  // try {
  //   const ticker = await ApiCaller.getPoloniex<Ticker>("returnTicker");
  //   console.log(ticker)
  // } catch (e) {
  //   console.log('Error: ')
  //   console.log(e)
  // }

  Mediator.addHandler(PercentHandler);
  Mediator.addHandler(VolumeHandler);

  Object.entries(data).forEach(([index, values]) => {
    let tradeReply = Mediator.request(index, values);
    console.log('tradeReply:', tradeReply);
  });
})();
