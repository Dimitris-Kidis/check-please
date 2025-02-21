import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSearchDialogComponent } from './car-search-dialog.component';

describe('CarSearchDialogComponent', () => {
  let component: CarSearchDialogComponent;
  let fixture: ComponentFixture<CarSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSearchDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
