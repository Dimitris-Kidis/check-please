import { round } from './round.helper';

export abstract class AbbreviationHelper {
  public static readonly abbreviations: { [key: string]: number } = { k: 1000, m: 1000000, b: 1000000000 };

  public static convertValue(char: string, value: number): number | null {
    if (char && AbbreviationHelper.abbreviations[char.toLowerCase()] && !isNaN(value)) {
      value = round(value * AbbreviationHelper.abbreviations[char.toLowerCase()], 4);
    }

    return value === Infinity ? null : value;
  }
}
