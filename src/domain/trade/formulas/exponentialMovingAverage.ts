import weightMultiplier from "./weightMultiplier";

/**
 * price(today) * weightMultiplier + EMA(yesterday) * (1 - weightMultiplier)
 */
export default function exponentialMovingAverage(
  arrPrice: number[],
  period: number
) {
  const today = arrPrice[arrPrice.length - 1];
  const yesterday = arrPrice[arrPrice.length - 2];
  const weightedMultiplier = weightMultiplier(period);
  return (
    today * weightedMultiplier + yesterday * (1 - weightedMultiplier)
  );
}
