import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/generated/graphql';
import { AuthState } from './store/authUser/authUser.state';
import { JwtTokenActions } from './store/jwtTokens/jwtTokens.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: User;
  loading: boolean;

  constructor(private store: Store) {
    this.store.select(AuthState).subscribe(({ loading, user }) => {
      this.user = user;
      this.loading = loading;
    });
  }

  logOut() {
    this.store.dispatch(new JwtTokenActions.Logout());
  }
}
