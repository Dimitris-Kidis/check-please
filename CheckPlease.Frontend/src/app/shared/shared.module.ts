import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TRANSLATE_CONFIG } from '../core/configs/translate.config';
import { TranslateResolveNullPipe } from '../pipes/translate-resolve-null.pipe';

@NgModule({
  imports: [CommonModule, TranslateResolveNullPipe, TranslateModule.forRoot(TRANSLATE_CONFIG)],
  exports: [CommonModule, TranslateModule, TranslateResolveNullPipe],
})
export class SharedModule {}
