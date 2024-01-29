import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairInfoComponent } from './repair-info.component';

describe('RepairInfoComponent', () => {
  let component: RepairInfoComponent;
  let fixture: ComponentFixture<RepairInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepairInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepairInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
