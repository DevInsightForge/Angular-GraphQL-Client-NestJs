import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { JwtTokens } from '../../../generated/graphql';
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
  @Selector()
  static getRefreshToken(state: JwtTokens): string {
    return state.refreshToken;
  }

  @Selector()
  static getAccessToken(state: JwtTokens): string {
    return state.accessToken;
  }

  @Action(JwtTokenActions.SetRefreshToken)
  setRefreshToken(
    ctx: JwtStateContext,
    action: JwtTokenActions.SetRefreshToken
  ) {
    ctx.patchState({
      refreshToken: action.refreshToken,
    });
  }

  @Action(JwtTokenActions.SetAccessToken)
  setAccessToken(ctx: JwtStateContext, action: JwtTokenActions.SetAccessToken) {
    ctx.patchState({
      accessToken: action.accessToken,
    });
  }
}
