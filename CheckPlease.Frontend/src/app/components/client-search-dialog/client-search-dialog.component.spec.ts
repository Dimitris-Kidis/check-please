import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearchDialogComponent } from './client-search-dialog.component';

describe('ClientSearchDialogComponent', () => {
  let component: ClientSearchDialogComponent;
  let fixture: ComponentFixture<ClientSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSearchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
