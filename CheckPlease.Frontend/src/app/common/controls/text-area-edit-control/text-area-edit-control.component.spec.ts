import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextAreaEditControlComponent } from './text-area-edit-control.component';

describe('TextAreaEditControlComponent', () => {
  let component: TextAreaEditControlComponent<string | null | undefined>;
  let fixture: ComponentFixture<TextAreaEditControlComponent<string | null | undefined>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaEditControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaEditControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
