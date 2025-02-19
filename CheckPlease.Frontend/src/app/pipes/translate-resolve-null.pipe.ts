import { ChangeDetectorRef, Injectable, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { LangChangeEvent, TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import * as _ from 'lodash-es';
import { Subscription, isObservable } from 'rxjs';

@Injectable()
@Pipe({
  name: 'translateResolveNull',
  pure: false, // required to update the value when the promise is resolved
  standalone: true,
})
export class TranslateResolveNullPipe implements PipeTransform, OnDestroy {
  private value: string = '';
  private lastKey: string | null;
  private lastParams: any[];
  private onTranslationChange?: Subscription;
  private onLangChange?: Subscription;
  private onDefaultLangChange?: Subscription;

  public constructor(private translate: TranslateService, private ref: ChangeDetectorRef) {}

  public transform(query?: string | null, ...args: any[]): any {
    if (!query || !query.length) {
      return query;
    }

    // if we ask another time for the same key, return the last value
    if (_.isEqual(query, this.lastKey) && _.isEqual(args, this.lastParams)) {
      return this.value;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    let interpolateParams: Object | undefined;
    if (!_.isUndefined(args[0]) && args.length) {
      if (typeof args[0] === 'string' && args[0].length) {
        // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
        // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
        const validArgs: string = args[0]
          .replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g, '"$2":')
          .replace(/:(\s)?(')(.*?)(')/g, ':"$3"');
        try {
          interpolateParams = JSON.parse(validArgs);
        } catch (e) {
          throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
        }
      } else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
        [interpolateParams] = args;
      }
    }

    // store the query, in case it changes
    this.lastKey = query;

    // store the params, in case they change
    this.lastParams = args;

    // set the value
    this.updateValue(query, interpolateParams);

    // if there is a subscription to onLangChange, clean it
    this.dispose();

    // subscribe to onTranslationChange event, in case the translations change
    if (!this.onTranslationChange) {
      this.onTranslationChange = this.translate.onTranslationChange.subscribe((event: TranslationChangeEvent) => {
        if (this.lastKey && event.lang === this.translate.currentLang) {
          this.lastKey = null;
          this.updateValue(query, interpolateParams, event.translations);
        }
      });
    }

    // subscribe to onLangChange event, in case the language changes
    if (!this.onLangChange) {
      this.onLangChange = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        if (this.lastKey) {
          this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
          this.updateValue(query, interpolateParams, event.translations);
        }
      });
    }

    // subscribe to onDefaultLangChange event, in case the default language changes
    if (!this.onDefaultLangChange) {
      this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(() => {
        if (this.lastKey) {
          this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
          this.updateValue(query, interpolateParams);
        }
      });
    }

    return this.value;
  }

  public ngOnDestroy(): void {
    this.dispose();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private updateValue(key: string, interpolateParams?: Object, translations?: any): void {
    const onTranslation = (res: string): void => {
      this.value = res !== undefined ? res : key;
      this.lastKey = key;
      this.ref.markForCheck();
    };
    if (translations) {
      const res = this.translate.getParsedResult(translations, key, interpolateParams);
      if (isObservable(res.subscribe)) {
        res.subscribe(onTranslation);
      } else {
        onTranslation(res);
      }
    }
    this.translate.get(key, interpolateParams).subscribe(onTranslation);
  }

  /**
   * Clean any existing subscription to change events
   */
  private dispose(): void {
    if (typeof this.onTranslationChange !== 'undefined') {
      this.onTranslationChange.unsubscribe();
      this.onTranslationChange = undefined;
    }
    if (typeof this.onLangChange !== 'undefined') {
      this.onLangChange.unsubscribe();
      this.onLangChange = undefined;
    }
    if (typeof this.onDefaultLangChange !== 'undefined') {
      this.onDefaultLangChange.unsubscribe();
      this.onDefaultLangChange = undefined;
    }
  }
}
