import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOptionComponent } from './client-option.component';

describe('ClientOptionComponent', () => {
  let component: ClientOptionComponent;
  let fixture: ComponentFixture<ClientOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
