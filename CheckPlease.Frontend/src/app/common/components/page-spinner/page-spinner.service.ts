import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { PAGE_SPINNER_DATA, PageSpinnerData } from './page-spinner-data';
import { PageSpinnerComponent } from './page-spinner.component';
import { PageSpinnerModule } from './page-spinner.module';

@Injectable({
  providedIn: PageSpinnerModule,
})
export class PageSpinnerService {
  private overlayRef: OverlayRef | null;

  public constructor(private readonly overlay: Overlay, private readonly injector: Injector) {}

  public changeState(open: boolean, viewContainerRef?: ViewContainerRef): void {
    if (open) {
      this.open(viewContainerRef);
    } else {
      this.close();
    }
  }

  public open(viewContainerRef?: ViewContainerRef, busyData?: PageSpinnerData): void {
    if (this.overlayRef) {
      return;
    }

    let strategy: PositionStrategy;

    if (viewContainerRef) {
      strategy = this.overlay
        .position()
        .flexibleConnectedTo(viewContainerRef.element)
        .withPositions([
          {
            originX: 'center',
            originY: 'center',
            overlayX: 'center',
            overlayY: 'center',
          },
        ]);
    } else {
      strategy = this.overlay.position().global().centerHorizontally().centerVertically();
    }

    const config = new OverlayConfig({ positionStrategy: strategy, hasBackdrop: true });
    this.overlayRef = this.overlay.create(config);

    this.overlayRef.attach(
      new ComponentPortal(
        PageSpinnerComponent,
        viewContainerRef,
        Injector.create({
          parent: this.injector,
          providers: [{ provide: PAGE_SPINNER_DATA, useValue: busyData }],
        }),
      ),
    );
  }

  public close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
