import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairRowsComponent } from './repair-rows.component';

describe('RepairRowsComponent', () => {
  let component: RepairRowsComponent;
  let fixture: ComponentFixture<RepairRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepairRowsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepairRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
