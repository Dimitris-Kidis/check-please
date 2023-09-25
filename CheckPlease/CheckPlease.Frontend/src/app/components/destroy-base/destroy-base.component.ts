import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-destroy-base',
  templateUrl: './destroy-base.component.html',
  styleUrls: ['./destroy-base.component.scss'],
})
export class DestroyBaseComponent implements OnDestroy {
  // eslint-disable-next-line rxjs/no-exposed-subjects
  destroy$: Subject<boolean> = new Subject<boolean>();

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    // eslint-disable-next-line rxjs/no-subject-unsubscribe
    this.destroy$.unsubscribe();
  }
}
