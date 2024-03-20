import { Optional } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';

export const CONTROL_CONTAINER_PROVIDER = {
  provide: ControlContainer,
  useFactory: (model: NgModelGroup, form: NgForm) => model ?? form,
  deps: [
    [new Optional(), NgModelGroup],
    [new Optional(), NgForm],
  ],
};
