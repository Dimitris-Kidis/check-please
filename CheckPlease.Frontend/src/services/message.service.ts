import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash-es';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public constructor(private readonly toastr: ToastrService, private readonly translate: TranslateService) {}

  public showSuccess(message: string): ActiveToast<any> {
    return this.showToast('success', { message });
  }

  public showSuccessByCode(messageCode: string, values?: any): ActiveToast<any> {
    const message = this.translate.instant(messageCode, values);

    return this.showToast('success', { message });
  }

  public showInfoByCode(messageCode: string, values?: any): ActiveToast<any> {
    const message = this.translate.instant(messageCode, values);

    return this.showToast('info', { message });
  }

  public showWarningByCode(messageCode: string, values?: any): ActiveToast<any> {
    const message = this.translate.instant(messageCode, values);

    return this.showToast('warning', { message });
  }

  public showErrorByCode(messageCode: string, titleCode?: string, values?: any): ActiveToast<any> {
    const title = titleCode ? this.translate.instant(titleCode, values) : undefined;
    const message = this.translate.instant(messageCode, values);

    return this.showToast('error', { message, title });
  }

  public showError(message: string): ActiveToast<any> {
    return this.showToast('error', { message });
  }

  public formatMessagesWithReplace(
    response: HttpErrorResponse,
    placeholder: string,
    replaceWith: string,
  ): HttpErrorResponse {
    const messages = response && response.error && response.error instanceof Array ? response.error : [];

    messages.forEach((msg) => {
      msg.message = _.replace(msg.message, placeholder, replaceWith);
    });

    return response;
  }

  public destroyAllMessages(): void {
    this.toastr.clear();
  }

  private showToast(
    type: 'success' | 'error' | 'info' | 'warning',
    params: { title?: string; message: string },
  ): ActiveToast<any> {
    const override: Partial<IndividualConfig> = {};

    if (type === 'success') {
      override.disableTimeOut = false;
    }

    return this.toastr[type](params.message, params.title, override);
  }
}
