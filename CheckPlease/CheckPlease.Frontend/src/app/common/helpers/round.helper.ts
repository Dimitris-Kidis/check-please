import * as _ from 'lodash-es';

export function round(value: number | null, precision: number = 2): number {
  return _.isNil(value) ? 0 : parseFloat(value.toFixed(precision));
}

export function roundDown(value: number | null, precision: number = 2): number {
  const minPrecision = 10 ** -precision;

  if (_.isNil(value) || (value > 0 && value < minPrecision)) {
    return 0;
  }

  if (value < 0 && value > -minPrecision) {
    return -minPrecision;
  }

  const split = value.toString().split('.');

  if (split.length === 2 && split[1].length > precision) {
    return parseFloat(`${split[0]}.${split[1].substring(0, precision)}`);
  }

  return value;
}
