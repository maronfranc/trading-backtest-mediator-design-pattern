export function riskReward(
  price: number | string,
  stopPercentage = 0.01,
  targetPercentage = 0.03
): [number, number] {
  if (Number.isNaN(+price))
    throw new Error("RiskReward price is Not a Number.");
  const numberPrice: number = +price;
  const stopRisk = numberPrice - numberPrice * stopPercentage;
  const targetRisk = numberPrice + numberPrice * targetPercentage;
  return [stopRisk, targetRisk];
}
