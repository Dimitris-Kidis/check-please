import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { LocalizationLoader } from '../../../localization-loader';

export const TRANSLATE_CONFIG: TranslateModuleConfig = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useExisting: LocalizationLoader,
  },
};
