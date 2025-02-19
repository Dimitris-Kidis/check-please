import { CheckPleaseEvent } from './check-please-event';

export class OverridePageTitleEvent extends CheckPleaseEvent {
  public pageTitle: string;

  public constructor(pageTitle: string) {
    super();
    this.pageTitle = pageTitle;
  }

  public getKey(): string {
    return 'OverridePageTitleEvent';
  }
}
