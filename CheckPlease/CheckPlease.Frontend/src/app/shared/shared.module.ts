import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateResolveNullPipe } from '../pipes/translate-resolve-null.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule, TranslateResolveNullPipe],
  exports: [CommonModule, TranslateModule, TranslateResolveNullPipe],
})
export class SharedModule {}
