import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextEditControlComponent } from './text-edit-control.component';

describe('TextEditControlComponent', () => {
  let component: TextEditControlComponent<any>;
  let fixture: ComponentFixture<TextEditControlComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextEditControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextEditControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
