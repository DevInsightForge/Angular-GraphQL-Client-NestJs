import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** message model */
export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  id: Scalars['ID'];
  sentAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage: Message;
  login?: Maybe<User>;
  refreshAccessToken?: Maybe<Scalars['Boolean']>;
  register?: Maybe<User>;
  removeMessage: Scalars['Boolean'];
};


export type MutationAddMessageArgs = {
  newMessageData: NewMessageInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveMessageArgs = {
  id: Scalars['String'];
};

export type NewMessageInput = {
  content: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  message: Message;
  messages: Array<Message>;
  userSessions: Array<RefreshToken>;
};


export type QueryAllUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryMessageArgs = {
  id: Scalars['String'];
};


export type QueryMessagesArgs = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  browser: Scalars['String'];
  device: Scalars['String'];
  isActive?: Maybe<Scalars['Boolean']>;
  system: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
};

export type User = {
  __typename?: 'User';
  dateJoined?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  isSuperadmin?: Maybe<Scalars['Boolean']>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UserRole>;
};

/** User role that controls user permissions */
export enum UserRole {
  Admin = 'admin',
  Superadmin = 'superadmin',
  User = 'user'
}

export type MessagesQueryVariables = Exact<{
  take: Scalars['Int'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, content: string, sentAt: any }> };

export type AddNewMessageMutationVariables = Exact<{
  newMessageData: NewMessageInput;
}>;


export type AddNewMessageMutation = { __typename?: 'Mutation', addMessage: { __typename?: 'Message', content: string } };

export type MessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', content: string } };

export const MessagesDocument = gql`
    query Messages($take: Int!) {
  messages(take: $take) {
    id
    content
    sentAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MessagesGQL extends Apollo.Query<MessagesQuery, MessagesQueryVariables> {
    override document = MessagesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddNewMessageDocument = gql`
    mutation AddNewMessage($newMessageData: NewMessageInput!) {
  addMessage(newMessageData: $newMessageData) {
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddNewMessageGQL extends Apollo.Mutation<AddNewMessageMutation, AddNewMessageMutationVariables> {
    override document = AddNewMessageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MessageAddedDocument = gql`
    subscription MessageAdded {
  messageAdded {
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MessageAddedGQL extends Apollo.Subscription<MessageAddedSubscription, MessageAddedSubscriptionVariables> {
    override document = MessageAddedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }