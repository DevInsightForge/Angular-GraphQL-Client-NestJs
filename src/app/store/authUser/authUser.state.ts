import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { mergeMap } from 'rxjs';
import {
  LoginGQL,
  RegisterGQL,
  User,
  UserProfileGQL,
} from 'src/generated/graphql';
import { JwtTokenActions } from '../jwtTokens/jwtTokens.actions';
import { AuthUser } from './authUser.actions';

interface AuthStateModel {
  loading: boolean;
  user: Partial<User>;
}

export type AuthStateContext = StateContext<AuthStateModel>;

@State<AuthStateModel>({
  name: 'AuthUser',
  defaults: {
    loading: true,
    user: {},
  },
})
@Injectable()
export class AuthState implements NgxsOnInit {
  constructor(
    private readonly userProfileQuery: UserProfileGQL,
    private readonly userLoginMutation: LoginGQL,
    private readonly userRegisterMutation: RegisterGQL
  ) {}

  private fetchUser(ctx: AuthStateContext) {
    this.userProfileQuery.fetch().subscribe(({ data, loading }) => {
      ctx.patchState({
        loading,
        user: data?.userProfile ?? {},
      });
    });
  }

  ngxsOnInit(ctx: AuthStateContext) {
    this.fetchUser(ctx);
  }

  @Selector()
  static loading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static user(state: AuthStateModel): Partial<User> {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return Boolean(state?.user?.id);
  }

  @Action(AuthUser.AuthLogin)
  login(ctx: AuthStateContext, action: AuthUser.AuthLogin) {
    return this.userLoginMutation.mutate({ input: action.payload }).pipe(
      mergeMap(async ({ data }) => {
        console.log(data);
        ctx.dispatch(
          new JwtTokenActions.SetRefreshToken(
            data?.login?.refreshToken as string
          )
        );
        ctx.dispatch(
          new JwtTokenActions.SetAccessToken(data?.login?.accessToken as string)
        );
      })
    );
  }
}
