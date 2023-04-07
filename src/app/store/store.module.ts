import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './authUser/authUser.state';

@NgModule({
  exports: [NgxsModule],
  imports: [
    NgxsModule.forRoot([AuthState]),
    // NgxsStoragePluginModule.forRoot({
    //   key: 'token',
    //   namespace: 'auth',
    // }),
  ],
})
export class StoreModule {}
