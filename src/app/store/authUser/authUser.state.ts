import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Apollo } from 'apollo-angular';
import { User, UserProfileGQL } from 'src/generated/graphql';
import { AuthUserActions } from './authUser.actions';

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
    private readonly apollo: Apollo,
    private readonly userProfileQuery: UserProfileGQL
  ) {}

  private fetchUser(ctx: AuthStateContext) {
    this.userProfileQuery
      .fetch(
        {},
        {
          fetchPolicy: 'network-only',
        }
      )
      .subscribe(({ data, loading }) => {
        ctx.patchState({
          loading,
          user: data?.userProfile ?? {},
        });
      });
  }

  private async clearStore() {
    await this.apollo.client.resetStore();
    await this.apollo.client.cache.reset();
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

  @Action(AuthUserActions.Reset)
  async reset(ctx: AuthStateContext) {
    await this.clearStore();
    this.fetchUser(ctx);
  }
}
