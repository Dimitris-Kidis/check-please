import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageTitleService } from './common/services/page-title.service';
import { MenuTabComponent } from './components/menu-tab/menu-tab.component';
import { NotificationModalModule } from './components/notification-modal/notification-modal.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'check-please-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, NotificationModalModule, MenuTabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public constructor(private readonly pageTitle: PageTitleService) {}

  public ngOnInit(): void {
    this.pageTitle.init();
  }
}
