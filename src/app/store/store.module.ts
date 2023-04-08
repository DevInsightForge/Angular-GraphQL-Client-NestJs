import { NgModule } from '@angular/core';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './authUser/authUser.state';
import { JwtTokenState } from './jwtTokens/jwtTokens.state';

@NgModule({
  exports: [NgxsModule],
  imports: [
    NgxsModule.forRoot([AuthState, JwtTokenState]),
    NgxsStoragePluginModule.forRoot({
      key: JwtTokenState,
      namespace: 'auth',
    }),
  ],
})
export class StoreModule {}
