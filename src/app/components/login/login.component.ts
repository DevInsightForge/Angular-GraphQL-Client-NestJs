import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthUser } from 'src/app/store/authUser/authUser.actions';
import { LoginInput } from 'src/generated/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private store: Store, private formBuilder: FormBuilder) {}

  loginForm = this.formBuilder.group<LoginInput>({
    email: 'admin@admin.com',
    password: 'Admin@123',
  });

  login() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.store.dispatch(
        new AuthUser.AuthLogin({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
      );
    }
  }
}
