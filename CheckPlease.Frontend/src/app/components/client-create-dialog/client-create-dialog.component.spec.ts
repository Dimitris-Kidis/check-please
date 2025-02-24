import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreateDialogComponent } from './client-create-dialog.component';

describe('ClientCreateDialogComponent', () => {
  let component: ClientCreateDialogComponent;
  let fixture: ComponentFixture<ClientCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCreateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
