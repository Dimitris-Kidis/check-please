import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCreateDialogComponent } from './car-create-dialog.component';

describe('CarCreateDialogComponent', () => {
  let component: CarCreateDialogComponent;
  let fixture: ComponentFixture<CarCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCreateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
