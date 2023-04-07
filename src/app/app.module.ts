import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './core/app-routing.module';
import { GraphQLModule } from './core/graphql.module';
import { StoreModule } from './store/store.module';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MomentModule,
    ReactiveFormsModule,
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
