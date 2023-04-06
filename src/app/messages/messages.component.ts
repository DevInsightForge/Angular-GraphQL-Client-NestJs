import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagesGQL, MessagesQuery } from 'src/generated/graphql';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  messages: Observable<MessagesQuery['messages']>;

  constructor(messageGQL: MessagesGQL) {
    this.messages = messageGQL
      .watch({ take: 50 })
      .valueChanges.pipe(map((result) => result?.data?.messages));
  }
}
