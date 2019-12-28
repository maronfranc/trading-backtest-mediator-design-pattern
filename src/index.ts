// import axios from "axios";
// import ApiCaller from "./services/ApiCaller";
import { Ticker } from "./interfaces";
import { data } from "./data";
import Mediator from "./strategies/Mediator";
import StrategyHandler, { strategyHandler } from "./strategies/strategyHandler";

// TODO: To com sono posso esquece
// verificar o loop no handler
// o valor esta negando quando vem false

(async function() {
  // try {
  //   const ticker = await ApiCaller.getPoloniex<Ticker>("returnTicker");
  //   console.log(ticker)
  // } catch (e) {
  //   console.log('Error: ')
  //   console.log(e)
  // }

  // function ProccessData(data: any) {
  //   return Object.entries(data).map((entries: any ) => {
  //     const [key, obj] = entries;
  //     console.log(obj)
  //     return [entries]
  //   })
  // }
  // let teste = ProccessData(data)
  // console.log(teste)

  // Mediator.addHandler(strategyHandler);
  Mediator.addHandler(StrategyHandler);
  // console.log(strategyHandler)
  let tradeRequest = {
    BTC_SC: {
      id: 150,
      last: "0.00000018",
      lowestAsk: "0.00000019",
      highestBid: "0.00000018",
      percentChange: "-0.05263157",
      baseVolume: "0.76942015",
      quoteVolume: "4239963.28065205",
      isFrozen: "0",
      high24hr: "0.00000019",
      low24hr: "0 .00000018"
    },
    BTC_FCT: {
      id: 155,
      last: "0.00022556",
      lowestAsk: "0.00022999",
      highestBid: "0.00022690",
      percentChange: "-0.12291480",
      baseVolume: "9.79361980",
      quoteVolume: "41352.08405341",
      isFrozen: "0",
      high24hr: "0.00027446",
      low24hr: "0.00022050"
    }
  };

  // Object.entries(tradeRequest).forEach(([index, values]) => {
  //   console.log(index);
  //   console.log(values);
  // });
  let tradeReply = Mediator.request(tradeRequest);
  // console.log('tradeReply:::', tradeReply);
})();
