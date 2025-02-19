import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairEditComponent } from './repair-edit.component';

describe('RepairEditComponent', () => {
  let component: RepairEditComponent;
  let fixture: ComponentFixture<RepairEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
