import { Component, DestroyRef, Input, OnChanges, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventAggregator } from '../../services/event-aggregator';
import { ClosePopoverEvent } from './close-popover.event';

@Component({
  selector: 'check-please-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  standalone: false,
})
export class PopoverComponent implements OnInit, OnChanges {
  @Input() public headerText?: string | null;
  @Input() public contentText?: string | null;
  @Input() public contentHtml: string;
  @Input() public contentData: any;
  @Input() public groupName: string;
  @Input() public size?: 'wide' | 'narrow' | 'sm-narrow';
  @Input() public sizeClass: string;

  public opened: boolean;

  private defaultSizeClass = 'medium';

  public constructor(private readonly eventAggregator: EventAggregator, private readonly destroyRef: DestroyRef) {}

  public ngOnChanges(): void {
    this.sizeClass = this.sizeClass || this.defaultSizeClass;
    this.size = this.size || 'narrow';
  }

  public ngOnInit(): void {
    this.eventAggregator
      .with(ClosePopoverEvent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.groupName === this.groupName) {
          this.close();
        }
      });
  }

  public toggleTooltip($event: MouseEvent): void {
    $event.stopPropagation();

    if (!this.opened) {
      this.eventAggregator.publish(new ClosePopoverEvent(this.groupName));
    }

    this.opened = !this.opened;
  }

  public close(): void {
    this.opened = false;
  }

  public closeButton(event: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    this.close();
  }
}
