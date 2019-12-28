import { proccessData } from "../utils/ProccesData";

export const strategyHandler = {
  canHandle: function(price: any) {
    return proccessData(price).map(([index, values]) => {
      // console.log(index);
      // console.log(values);
      return price[index].highestBid === price["BTC_FCT"].highestBid;
    });
    // console.log("Né pussivel");
    // console.log("data: ", data);
    // console.log("Né pussivel");
    // console.log(values)
    // return price["BTC_FCT"].highestBid === "0.00022690";
  },
  handle: function(price: any) {
    console.log("You can't handle the truth!", price);
    return {
      pair: price.pair,
      highestBid: price["BTC_FCT"].highestBid,
      order: `Strategy says: Buy!`
    };
  }
};

class StrategyHandler {
  private index: any;
  private values: any;
  public canHandle(price: any) {
    Object.entries(price).forEach(([index, values]) => {
      this.index = index;
      this.values =  values;
    });
    return (
      price[this.index].highestBid === price["BTC_FCT"].highestBid
      );
    }
    
    public handle(price: any): any {
      // console.log(this.index);
      // console.log(this.values);
    // console.log("You can't handle the truth!", price);
    return {
      pair: this.index,
      highestBid: price["BTC_FCT"].highestBid,
      order: `Strategy says: Buy!`
    };
  }
}
export default new StrategyHandler();