import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MessageService } from '../../../services/message.service';
import { DialogData, NotificationModalComponent } from './notification-modal.component';

@Injectable()
export class NotificationModalService {
  private readonly defaultConfirmCode: string = 'COMMON.MODALS.CONFIRM';
  private readonly defaultCancelCode: string = 'COMMON.MODALS.CANCEL';
  private readonly defaultDeleteCode: string = 'COMMON.DELETE';

  public constructor(
    private readonly dialog: MatDialog,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
  ) {}

  public showDeleteModal(
    titleCode: string,
    messageCode: string,
    confirmCode?: string,
    cancelCode?: string,
    isCancelSelected?: boolean,
  ): Observable<boolean | undefined> {
    confirmCode = confirmCode || this.defaultDeleteCode;
    const translatedMessage = this.translate.instant(messageCode);
    const modalInstance = this.openModal(titleCode, translatedMessage, confirmCode, cancelCode, isCancelSelected);

    return modalInstance.afterClosed();
  }

  public showConfirmationModal(
    titleCode: string,
    messageCode: string,
    isCancelSelected?: boolean,
  ): Observable<boolean | undefined> {
    const modalInstance = this.openModal(titleCode, messageCode, 'COMMON.YES', 'COMMON.NO', isCancelSelected);

    return modalInstance.afterClosed();
  }

  public showInformationModal(titleCode: string, messageCode: string): Observable<boolean | undefined> {
    const modalInstance = this.openModal(titleCode, messageCode, 'COMMON.YES', undefined, undefined, undefined, true);

    return modalInstance.afterClosed();
  }

  public showModal(
    titleCode: string,
    messageCode: string,
    confirmCode?: string,
    cancelCode?: string | null,
    isCancelSelected?: boolean,
    modalOptions?: ModalOptions | null,
    isCancelHidden?: boolean,
  ): Observable<boolean | undefined> {
    const modalInstance = this.openModal(
      titleCode,
      messageCode,
      confirmCode,
      cancelCode,
      isCancelSelected,
      modalOptions,
      isCancelHidden,
    );

    return modalInstance.afterClosed();
  }

  public showModalWithParams(
    titleCode: string,
    messageCode: string,
    messageParams?: { [key: string]: string } | null,
    confirmCode?: string | null,
    cancelCode?: string | null,
    isCancelSelected?: boolean | null,
    modalOptions?: ModalOptions | null,
    isCancelHidden?: boolean | null,
    iconName?: string | null,
  ): Observable<boolean | undefined> {
    const title = messageParams ? this.translate.instant(titleCode, messageParams) : this.translate.instant(titleCode);

    const message = messageParams
      ? this.translate.instant(messageCode, messageParams)
      : this.translate.instant(messageCode);

    const modalInstance = this.openModal(
      title,
      message,
      confirmCode,
      cancelCode,
      isCancelSelected,
      modalOptions,
      isCancelHidden,
      iconName,
    );

    return modalInstance.afterClosed();
  }

  private openModal(
    titleCode: string,
    messageCode: string,
    confirmCode?: string | null,
    cancelCode?: string | null,
    isCancelSelected?: boolean | null,
    modalOptions?: ModalOptions | null,
    isCancelHidden?: boolean | null,
    iconName?: string | null,
  ): MatDialogRef<NotificationModalComponent, boolean> {
    this.messageService.destroyAllMessages();

    const overrideModalOptions = modalOptions || {};

    return this.dialog.open<NotificationModalComponent, DialogData, boolean>(NotificationModalComponent, {
      width: '600px',
      position: { top: '70px' },
      data: {
        title: titleCode,
        message: messageCode,
        confirm: confirmCode || this.defaultConfirmCode,
        cancel: cancelCode || this.defaultCancelCode,
        isCancelSelected: isCancelSelected || false,
        isCancelHidden: isCancelHidden || false,
        iconName: iconName,
      },
      ...overrideModalOptions,
    });
  }
}

export type ModalOptions = Pick<
  MatDialogConfig<DialogData>,
  'hasBackdrop' | 'disableClose' | 'autoFocus' | 'panelClass' | 'position'
>;
