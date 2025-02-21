import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTabComponent } from './repair-tab.component';

describe('RepairTabComponent', () => {
  let component: RepairTabComponent;
  let fixture: ComponentFixture<RepairTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepairTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
