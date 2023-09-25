import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOptionComponent } from './car-option.component';

describe('CarOptionComponent', () => {
  let component: CarOptionComponent;
  let fixture: ComponentFixture<CarOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
