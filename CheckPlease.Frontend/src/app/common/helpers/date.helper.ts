import * as _ from 'lodash-es';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

export function countDaysFromHumanized(dateTime: Date): string {
  if (!dateTime) {
    return '';
  }

  // we use startOfDay() in order to avoid cases such as
  // ex: today = Jan 5 10:00, last interaction = Jan 1 23:00
  // diff - 3 days, 2 hrs, but it's actually 4 different day
  const date = moment(dateTime).startOf('day');
  const today = moment().startOf('day');

  const dateDiff = today.diff(date, 'days');
  let result: string;

  if (dateDiff === 0 || dateDiff === 1) {
    [result] = date.calendar(today).split(' '); // get "Yesterday" or "Today" word
  } else {
    const oldSettings = Number(moment.relativeTimeThreshold('d')); // this settings are global, we'll need to restore them right away
    moment.relativeTimeThreshold('d', Number.MAX_VALUE); // do not stringify as "1 year ago", we need the duration in days
    result = moment.duration(date.diff(today)).humanize(true);
    moment.relativeTimeThreshold('d', oldSettings);
  }

  return result;
}

export function isToday(dateTime?: Date | null): boolean {
  if (!dateTime) {
    return false;
  }

  const date = moment(dateTime).startOf('day');
  const today = moment().startOf('day');

  return today.diff(date, 'days') == 0;
}

export function createDateAsUtc(date: any): Date {
  if (!date) return date;

  if (typeof date === 'string') date = new Date(date.replace(new RegExp('"', 'g'), ''));

  const year = date.getUTCFullYear();
  if (year >= 0 && year < 100) {
    const utcDate = new Date(
      Date.UTC(year + 100, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()),
    );
    utcDate.setUTCFullYear(utcDate.getFullYear() - 100);
    return utcDate;
  }

  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ),
  );
}

export function convertDateToUtc(date: any): Date {
  if (!date) return date;

  if (typeof date === 'string') date = new Date(date);

  const year = date.getUTCFullYear();
  if (year >= 0 && year < 100) {
    const utcDate = new Date(
      Date.UTC(year + 100, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()),
    );
    utcDate.setUTCFullYear(utcDate.getFullYear() - 100);
    return utcDate;
  }

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
}

export function getDateWithTimePart(date: Date, time: moment.Moment): Date {
  return moment(date).hour(time.hour()).minute(time.minute()).startOf('minute').toDate();
}

export function getTodayWithTimePart(time: moment.Moment): moment.Moment {
  return moment().hour(time.hour()).minute(time.minute()).startOf('minute');
}

export function setTimezoneSpecificDate(date: Date, timeOffset: number): Date {
  const dateUtc = convertDateToUtc(date);
  dateUtc.setMinutes(dateUtc.getMinutes() + timeOffset);

  return dateUtc;
}

export function addPadding(value: number): string {
  return value < 10 ? `0${value}` : value.toString();
}

export function createOffset(offsetInMinutes: number): string {
  const sign = offsetInMinutes < 0 ? '-' : '+';
  const hours = addPadding(Math.floor(Math.abs(offsetInMinutes / 60)));
  const minutes = addPadding(Math.abs(offsetInMinutes % 60));
  return `${sign}${hours}:${minutes}`;
}

export function getDateTime(date: string | Date): Date {
  if (_.isString(date)) {
    return new Date(Date.parse(date.toString()));
  }

  return date;
}

export function roundUpTime(momentObj: moment.Moment, roundBy: 'day' | 'month' | 'year' | 'hour'): moment.Moment {
  return momentObj.add(1, roundBy).startOf(roundBy);
}

export function compareDatesEquality(dateStart?: Date | null, dateEnd?: Date | null): { [key: string]: any } | null {
  if (!dateEnd) {
    return null;
  }

  if (!dateStart) {
    return null;
  }

  const fromDate = moment(dateStart);
  const toDate = moment(dateEnd);

  const compareFunc = fromDate.isSame;
  const isSame = compareFunc.apply(fromDate, [toDate, 'minute']);

  if (isSame) {
    return {
      datesCannotBeEqual: true,
    };
  } else {
    return null;
  }
}
