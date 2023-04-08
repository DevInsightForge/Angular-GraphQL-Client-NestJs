import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Apollo } from 'apollo-angular';
import { mergeMap } from 'rxjs';
import { JwtTokens, LoginGQL, RegisterGQL } from '../../../generated/graphql';
import { AuthUserActions } from '../authUser/authUser.actions';
import { JwtTokenActions } from './jwtTokens.actions';

export type JwtStateContext = StateContext<JwtTokens>;

@State<JwtTokens>({
  name: 'tokens',
  defaults: {
    accessToken: '',
    refreshToken: '',
  },
})
@Injectable()
export class JwtTokenState {
  constructor(
    private readonly userLoginMutation: LoginGQL,
    private readonly userRegisterMutation: RegisterGQL
  ) {}

  @Selector()
  static getRefreshToken(state: JwtTokens): string {
    return state.refreshToken;
  }

  @Selector()
  static getAccessToken(state: JwtTokens): string {
    return state.accessToken;
  }

  @Action(JwtTokenActions.AuthLogin)
  login(ctx: JwtStateContext, action: JwtTokenActions.AuthLogin) {
    return this.userLoginMutation.mutate({ input: action.payload }).pipe(
      mergeMap(async ({ data }) => {
        ctx.setState({
          refreshToken: data?.login?.refreshToken as string,
          accessToken: data?.login?.accessToken as string,
        });
        ctx.dispatch(new AuthUserActions.Reset());
      })
    );
  }

  @Action(JwtTokenActions.Logout)
  logout(ctx: JwtStateContext) {
    ctx.setState({
      accessToken: '',
      refreshToken: '',
    });
    ctx.dispatch(new AuthUserActions.Reset());
  }
}
