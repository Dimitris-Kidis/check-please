import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTabComponent } from './menu-tab.component';

describe('MenuTabComponent', () => {
  let component: MenuTabComponent;
  let fixture: ComponentFixture<MenuTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
