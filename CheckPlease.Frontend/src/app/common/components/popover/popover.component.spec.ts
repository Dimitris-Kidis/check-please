import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverComponent } from './popover.component';

describe('Given PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopoverComponent],
      imports: [OverlayModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when initialized', () => {
    it('with no size, should default it to "narrow"', () => {
      // act
      component.ngOnChanges();

      // asserts
      expect(component.size).toBe('narrow');
    });

    it('with specified size, should leave it as specified', () => {
      // arrange
      component.size = 'wide';

      // act
      component.ngOnInit();

      // assert
      expect(component.size).toBe('wide');
    });
  });
});
