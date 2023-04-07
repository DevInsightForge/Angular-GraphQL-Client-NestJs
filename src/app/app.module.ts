import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './core/app-routing.module';
import { GraphQLModule } from './core/graphql.module';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [AppComponent, MessagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MomentModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
