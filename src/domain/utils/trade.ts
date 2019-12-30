import Portfolio from "../repositories/Portfolio";

export function trade(
  PortFolio: typeof Portfolio,
  { toBuy, toSell, amount, price }: any,
) {
  if (toSell === 0) {
    // console.log(`${toSell} in your account.`);
  } else if (toSell! - amount > 0) {
    PortFolio.comfirmTrade({ toBuy, toSell, amount, price });
  } else {
    // } else if (toSell - amount < 0 && toSell > 0) {
    PortFolio.comfirmTrade({
      toBuy,
      toSell,
      price,
      amount: toSell
    });
  }
}
