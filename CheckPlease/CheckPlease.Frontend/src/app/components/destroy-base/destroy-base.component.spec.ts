import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyBaseComponent } from './destroy-base.component';

describe('DestroyBaseComponent', () => {
  let component: DestroyBaseComponent;
  let fixture: ComponentFixture<DestroyBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestroyBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestroyBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
