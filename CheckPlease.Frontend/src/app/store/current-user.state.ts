// import { Injectable } from '@angular/core';
// import { Action, Selector, State, StateContext } from '@ngxs/store';
// import { Observable, tap } from 'rxjs';
// import { User } from '../../models/user';
// import { AuthenticationService } from '../../services/authentification.service';
// import { DisplayErrorHelper } from '../common/helpers/display-error.helper';
// import { LoadCurrentUserData } from './current-user.actions';

// @Injectable()
// @State<User>({
//   name: 'MainPageState',
//   defaults: {},
// })
// export class CurrentUserState {
//   public constructor(
//     private readonly authenticationService: AuthenticationService,
//     private readonly displayErrorHelper: DisplayErrorHelper,
//   ) {}

//   @Selector()
//   public static getCurrentUser(state: User): User {
//     return state;
//   }

//   @Action(LoadCurrentUserData, { cancelUncompleted: true })
//   public loadMainPageData(ctx: StateContext<User>): Observable<User> {
//     return this.authenticationService.getCurrentUser().pipe(
//       tap((data: User) => {
//         ctx.patchState(data);
//       }),
//       this.displayErrorHelper.handleHttpError(),
//     );
//   }
// }
