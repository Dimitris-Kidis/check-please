import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { PageSpinnerModule } from './common/components/page-spinner/page-spinner.module';
import { NgOnDestroy } from './common/services/ng-on-destroy.service';
import { TRANSLATE_CONFIG } from './core/configs/translate.config';
import { DateHttpInterceptor } from './core/interceptors/date-http.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { StoreModule } from './store/store.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(StoreModule),
    importProvidersFrom(PageSpinnerModule),
    importProvidersFrom(TranslateModule.forRoot(TRANSLATE_CONFIG)),
    importProvidersFrom(QuillModule.forRoot()),
    NgOnDestroy,
    provideHttpClient(withInterceptorsFromDi()),
    provideMomentDateAdapter(undefined, { useUtc: true }),
    // {
    //   provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    //   useValue: { useUtc: true }, // Включаем UTC для всех дат
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateHttpInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: DateAttributesInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'en-GB',
    // },
  ],
};
