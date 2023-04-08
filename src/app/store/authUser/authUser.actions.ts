import { LoginInput, RegisterInput } from 'src/generated/graphql';

export namespace AuthUser {
  export class AuthLogin {
    static readonly type = '[Auth] Login';
    constructor(public payload: LoginInput) {}
  }

  export class AuthRegister {
    static readonly type = '[Auth] Register';
    constructor(public payload: RegisterInput) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }
}
