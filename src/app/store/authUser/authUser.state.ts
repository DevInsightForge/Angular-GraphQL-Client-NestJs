import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

import { AuthUser } from './authUser.actions';

@State<AuthUser.AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthUser.AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthUser.AuthStateModel): boolean {
    return !!state.token;
  }

  constructor() {}

  // @Action(AuthUser.Login)
  // login(ctx: StateContext<AuthUser.AuthStateModel>, action: AuthUser.Login) {
  //   return this.authService.login(action.payload).pipe(
  //     tap((result: { token: string }) => {
  //       ctx.patchState({
  //         token: result.token,
  //         username: action.payload.username,
  //       });
  //     })
  //   );
  // }
}
