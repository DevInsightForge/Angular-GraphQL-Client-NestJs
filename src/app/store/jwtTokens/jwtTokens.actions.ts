import { LoginInput, RegisterInput } from 'src/generated/graphql';

export namespace JwtTokenActions {
  export class SetRefreshToken {
    static readonly type = '[JWT] Set Refresh Token';
    constructor(public refreshToken: string) {}
  }
  export class GetRefreshToken {
    static readonly type = '[JWT] Get Refresh Token';
  }

  export class SetAccessToken {
    static readonly type = '[JWT] Set Access Token';
    constructor(public accessToken: string) {}
  }

  export class GetAccessToken {
    static readonly type = '[JWT] Get Access Token';
  }

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
