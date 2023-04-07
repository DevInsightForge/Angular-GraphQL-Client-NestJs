import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QueryRef } from 'apollo-angular';
import {
  AddNewMessageGQL,
  Message,
  MessageAddedDocument,
  MessagesGQL,
  MessagesQuery,
  MessagesQueryVariables,
} from 'src/generated/graphql';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  private messageQuery: QueryRef<MessagesQuery, MessagesQueryVariables>;
  messages: Message[];
  loading: boolean;
  errors: any;

  @ViewChild('scrollAnchor') scrollRef: ElementRef;

  constructor(
    private messageGQL: MessagesGQL,
    private messageMutation: AddNewMessageGQL,
    private formBuilder: FormBuilder
  ) {
    this.messageQuery = this.messageGQL.watch({ take: 20 });
  }

  newMsgForm = this.formBuilder.group({
    content: '',
  });

  onSubmit(): void {
    if (this.newMsgForm.value.content) {
      this.messageMutation
        .mutate({
          newMessageData: {
            content: this.newMsgForm.value.content,
          },
        })
        .subscribe();
      this.newMsgForm.reset();
    }
  }

  scrollToLatest() {
    setTimeout(() => {
      this.scrollRef?.nativeElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }, 100);
  }

  ngOnInit(): void {
    this.messageQuery.valueChanges.subscribe(({ data, loading, errors }) => {
      this.loading = loading;
      this.messages = data?.messages;
      this.errors = errors;
      this.scrollToLatest();
    });
    this.messageQuery.subscribeToMore({
      document: MessageAddedDocument,
      updateQuery: (prev, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.messageAdded;

        this.scrollToLatest();
        return Object.assign({}, prev, {
          messages: [...prev.messages, newItem],
        });
      },
    });
  }
}
