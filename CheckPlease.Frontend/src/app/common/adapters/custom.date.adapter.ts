import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';

@Injectable()
export class CheckPleaseDateProvider extends NativeDateAdapter {
  private _localeData: {
    firstDayOfWeek: number;
    longMonths: string[];
    shortMonths: string[];
    dates: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
  };

  public constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string) {
    super(matDateLocale);
    this.setLocale(matDateLocale);
  }

  public override setLocale(locale: string): void {
    super.setLocale(locale);

    const momentLocaleData = moment.localeData(locale);
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates: Array.from({ length: 31 }).map((_, i) => moment(this.createDate(2017, 0, i + 1)).format('D')),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
    };
  }

  public override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    // js doesn't support narrow month names, so we just use short if narrow is requested.
    return style == 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
  }

  public override getDateNames(): string[] {
    return this._localeData.dates;
  }

  public override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style == 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style == 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  public override getYearName(date: Date): string {
    return moment(date).format('YYYY');
  }

  public override format(date: Date, displayFormat: string): string {
    const dateMoment = moment(date).locale(this.locale);

    if (!this.isValid(date)) {
      throw Error('KnightFrankDateAdapter: Cannot format invalid date.');
    }

    return dateMoment.format(displayFormat);
  }

  public override getFirstDayOfWeek(): number {
    return 1;
  }

  public override parse(value: any, parseFormat?: any): Date | null {
    if (value && typeof value == 'string') {
      return this._createMoment(value, parseFormat, this.locale).toDate();
    }

    return value ? this._createMoment(value).locale(this.locale).toDate() : null;
  }

  private _createMoment(
    date?: moment.MomentInput,
    format?: moment.MomentFormatSpecification,
    locale?: string,
  ): moment.Moment {
    return moment(date, format, locale);
  }
}
