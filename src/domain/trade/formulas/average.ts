import sumArrayOfNumbers from "../../../utils/sumArrayOfNumbers";

export function average(arrValues: number[]) {
  return sumArrayOfNumbers(arrValues) / arrValues.length;
}
