import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsTabComponent } from './cars-tab.component';

describe('CarsTabComponent', () => {
  let component: CarsTabComponent;
  let fixture: ComponentFixture<CarsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
