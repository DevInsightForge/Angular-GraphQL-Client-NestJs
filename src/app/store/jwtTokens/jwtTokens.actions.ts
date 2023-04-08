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
}
