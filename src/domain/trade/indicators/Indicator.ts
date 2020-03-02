import { ChartData } from "../../../typescript/ChartData";

/**
 * Classe abstrata que guarda um vetor com o tamanho
 * máximo igual ao this.period.
 */
export default abstract class Indicator<T> {
  protected arrValues: number[];
  public indicator: T | undefined;

  constructor(public period: number) {
    this.arrValues = [];
  }

  /**
   * Executa um push dentro do vetor de números e os calcula de acordo
   * com a equação do indicador e põe dentro do this.indicator.
   */
  pushData(n: number, chartData: ChartData | null = null) {
    if (this.arrValues.length > this.period - 1) {
      this.arrValues.shift();
    }
    this.arrValues.push(n);
    this.calc(chartData);
  }

  /**
   * Roda toda vez que um valor é adicionado usando
   * Indicator.pushData(number)
   */
  protected abstract calc(chartData: ChartData | null): void;
}
