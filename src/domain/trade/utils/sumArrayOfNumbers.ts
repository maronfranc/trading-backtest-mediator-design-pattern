export default function sumArrayOfNumbers(
  arr: number[],
  initialValue: number = 0
): number {
  return arr.reduce((acc: number, value: number): number => {
    return acc + value;
  }, initialValue);
}
