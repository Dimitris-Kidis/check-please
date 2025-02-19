import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environment/environment';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'check-please-not-found',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent {
  public readonly baseUrl = environment.redirectAfterAuthUrl;
}
