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

export type JwtTokens = {
  __typename?: 'JwtTokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
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
  user: MessageUser;
};

export type MessageUser = {
  __typename?: 'MessageUser';
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage: Message;
  login: JwtTokens;
  refreshAccessToken?: Maybe<Scalars['String']>;
  register: JwtTokens;
  removeMessage: Scalars['Boolean'];
};


export type MutationAddMessageArgs = {
  newMessageData: NewMessageInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshAccessTokenArgs = {
  refreshToken: Scalars['String'];
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
  messages: Array<Message>;
  userProfile: User;
  userSessions: Array<RefreshToken>;
};


export type QueryAllUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
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


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, content: string, sentAt: any, user: { __typename?: 'MessageUser', id: string } }> };

export type AddNewMessageMutationVariables = Exact<{
  newMessageData: NewMessageInput;
}>;


export type AddNewMessageMutation = { __typename?: 'Mutation', addMessage: { __typename?: 'Message', id: string, content: string, sentAt: any, user: { __typename?: 'MessageUser', id: string } } };

export type MessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', id: string, content: string, sentAt: any, user: { __typename?: 'MessageUser', id: string } } };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'User', id: string, email: string, dateJoined?: any | null, lastLogin?: any | null, isActive?: boolean | null, role?: UserRole | null, isSuperadmin?: boolean | null, isAdmin?: boolean | null } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'JwtTokens', refreshToken: string, accessToken: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'JwtTokens', refreshToken: string, accessToken: string } };

export type RefreshAccessTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshAccessTokenMutation = { __typename?: 'Mutation', refreshAccessToken?: string | null };

export const MessagesDocument = gql`
    query Messages($take: Int!) {
  messages(take: $take) {
    id
    content
    sentAt
    user {
      id
    }
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
    id
    content
    sentAt
    user {
      id
    }
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
    id
    content
    sentAt
    user {
      id
    }
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
export const UserProfileDocument = gql`
    query UserProfile {
  userProfile {
    id
    email
    dateJoined
    lastLogin
    isActive
    role
    isSuperadmin
    isAdmin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserProfileGQL extends Apollo.Query<UserProfileQuery, UserProfileQueryVariables> {
    override document = UserProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    refreshToken
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    override document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    refreshToken
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    override document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RefreshAccessTokenDocument = gql`
    mutation RefreshAccessToken($refreshToken: String!) {
  refreshAccessToken(refreshToken: $refreshToken)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshAccessTokenGQL extends Apollo.Mutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables> {
    override document = RefreshAccessTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }