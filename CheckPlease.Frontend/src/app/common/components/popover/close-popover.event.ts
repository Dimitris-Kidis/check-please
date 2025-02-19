import { CheckPleaseEvent } from '../../services/check-please-event';

export class ClosePopoverEvent extends CheckPleaseEvent {
  public constructor(public groupName?: string | null) {
    super();
  }

  public getKey(): string {
    return 'closePopoverEvent.close';
  }
}
