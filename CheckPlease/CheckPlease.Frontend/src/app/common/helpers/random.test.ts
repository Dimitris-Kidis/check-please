// eslint-disable-next-line import/no-extraneous-dependencies
import * as moment from 'moment';

export function randomString(prefix: string = ''): string {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomCharsLength = randomChars.length;
  const result = new Array(10) // Длина строки
    .fill(null)
    .map(() => randomChars.charAt(Math.floor(Math.random() * randomCharsLength)))
    .join('');
  return prefix + result;
}

export function randomNumber(): number {
  return Math.floor(Math.random() * 100);
}

export function randomBoolean(): boolean {
  return Math.random() < 0.5;
}

export function randomDayInPast(): Date {
  const days = Math.round(Math.random() * 1000 + 1);

  return moment().add(-days, 'day').startOf('day').toDate();
}

export function randomDayInFuture(): Date {
  const days = Math.round(Math.random() * 1000 + 1);

  return moment().add(days, 'day').startOf('day').toDate();
}

export function generateWithin(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + 1;
}
