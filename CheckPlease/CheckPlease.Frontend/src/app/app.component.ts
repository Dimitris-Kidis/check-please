import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CarsService } from 'src/services/cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'check-please';

  public constructor(private readonly carService: CarsService) {
    library.add(faPlus);
  }

  public ngOnInit(): void {}
}
