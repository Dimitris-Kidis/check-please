import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { environment } from '../../../environment/environment';
import { LocalizationLoader } from '../../../localization-loader';

export const TRANSLATE_CONFIG: TranslateModuleConfig = {
  defaultLanguage: environment.defaultLanguage,
  loader: {
    provide: TranslateLoader,
    useExisting: LocalizationLoader,
  },
};
