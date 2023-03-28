import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";

const MESSAGES_SUBSCRIPTION = gql`
  subscription Messages {
    messageAdded {
      id
      content
      sentAt
    }
  }
`;

const MESSAGES_QUERY = gql`
  query Messages($take: Int!) {
    messages(take: $take) {
      id
      content
      sentAt
    }
  }
`;

const MESSAGES_MUTATION = gql`
  mutation Mutation($newMessageData: NewMessageInput!) {
    addMessage(newMessageData: $newMessageData) {
      content
    }
  }
`;

const App = () => {
  // const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
  //   onData: ({ data }) =>
  //     setMessages((prev) => [...prev, data?.data?.messageAdded]),
  // });

  const [messageMutation] = useMutation(MESSAGES_MUTATION);

  const { data: { messages = [] } = {}, subscribeToMore } = useQuery(
    MESSAGES_QUERY,
    {
      variables: {
        take: 10,
      },
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.messageAdded;

        return Object.assign({}, prev, {
          messages: [...prev.messages, newItem],
        });
      },
    });
  }, []);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log("Input value", e.target.value);
      if (Boolean(e.target.value)) {
        messageMutation({
          variables: {
            newMessageData: {
              content: e.target.value,
            },
          },
        });
        e.target.value = "";
      }
    }
  };

  return (
    <Container>
      <Box>
        {messages?.map((item) => {
          return <Typography>{item?.content}</Typography>;
        })}
      </Box>
      <TextField onKeyPress={onKeyPress} />
    </Container>
  );
};

export default App;
