import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-destroy-base',
  templateUrl: './destroy-base.component.html',
})
export class DestroyBaseComponent implements OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
