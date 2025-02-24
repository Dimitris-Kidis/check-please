import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTabComponent } from './main-tab.component';

describe('MainTabComponent', () => {
  let component: MainTabComponent;
  let fixture: ComponentFixture<MainTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
