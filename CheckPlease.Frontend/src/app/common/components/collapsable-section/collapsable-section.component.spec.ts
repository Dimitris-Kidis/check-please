import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollapsableSectionComponent } from './collapsable-section.component';

describe('CollapsableSectionComponent', () => {
  let component: CollapsableSectionComponent;
  let fixture: ComponentFixture<CollapsableSectionComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(CollapsableSectionComponent, {
      set: {
        imports: [CommonModule],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });

    await TestBed.configureTestingModule({
      imports: [CollapsableSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollapsableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
