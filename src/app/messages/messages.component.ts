import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddNewMessageGQL, Message, MessagesGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Observable<Message[]>;

  @ViewChild('scrollAnchor') scrollRef: ElementRef;

  constructor(
    private messageGQL: MessagesGQL,
    private messageMutation: AddNewMessageGQL,
    private formBuilder: FormBuilder
  ) {}

  newMsgForm = this.formBuilder.group({
    content: '',
  });

  onSubmit(): void {
    if (this.newMsgForm.value.content) {
      this.messageMutation
        .mutate(
          {
            newMessageData: {
              content: this.newMsgForm.value.content,
            },
          },
          {
            refetchQueries: [
              {
                query: this.messageGQL.document,
                variables: {
                  take: 20,
                },
              },
            ],
          }
        )
        .subscribe();
      this.newMsgForm.reset();
    }
  }

  scrollToLatest() {
    setTimeout(() => {
      this.scrollRef.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }, 100);
  }

  ngOnInit(): void {
    this.messages = this.messageGQL.watch({ take: 20 }).valueChanges.pipe(
      map((result) => {
        this.scrollToLatest();
        return result?.data?.messages;
      })
    );
  }
}
