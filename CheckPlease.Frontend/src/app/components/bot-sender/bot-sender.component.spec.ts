import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotSenderComponent } from './bot-sender.component';

describe('BotSenderComponent', () => {
  let component: BotSenderComponent;
  let fixture: ComponentFixture<BotSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotSenderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BotSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
