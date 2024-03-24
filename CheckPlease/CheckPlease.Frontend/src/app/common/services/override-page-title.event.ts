import { CpEvent } from './cp-event';

export class OverridePageTitleEvent extends CpEvent {
  public pageTitle: string;

  public constructor(pageTitle: string) {
    super();
    this.pageTitle = pageTitle;
  }

  public getKey(): string {
    return 'OverridePageTitleEvent';
  }
}
