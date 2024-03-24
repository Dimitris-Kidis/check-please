import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PageTitleService } from './common/services/page-title.service';

@Component({
  selector: 'check-please-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'check-please';

  public constructor(private readonly pageTitle: PageTitleService) {
    library.add(faPlus);
  }

  public ngOnInit(): void {
    this.pageTitle.init();
  }
}
