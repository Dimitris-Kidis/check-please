import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { CheckboxEditControlComponent } from './checkbox-edit-control.component';

describe('CheckboxEditControlComponent', () => {
  let component: CheckboxEditControlComponent<boolean | null | undefined>;
  let fixture: ComponentFixture<CheckboxEditControlComponent<boolean | null | undefined>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxEditControlComponent],
      providers: [{ provide: NgForm, useValue: new NgForm([], []) }],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxEditControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
