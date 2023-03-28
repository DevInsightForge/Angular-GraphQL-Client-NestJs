import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef } from "react";

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
  const scrollRef = useRef();

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

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [messages]);

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
      <List
        sx={{
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {messages?.map((item, idx) => {
          return (
            <ListItem
              key={idx}
              alignItems="flex-start"
              sx={{
                bgcolor: "background.paper",
                mb: "10px",
                border: 1,
                borderColor: "#00000060",
                borderRadius: "10px",
              }}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item?.content}
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {moment(item?.sentAt).fromNow()}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
        <Box ref={scrollRef} sx={{ float: "left", clear: "both" }} />
      </List>
      <TextField
        onKeyPress={onKeyPress}
        sx={{
          width: 1,
          height: "50px",
          mt: "10px",
          "& fieldset": {
            border: 1,
            borderColor: "#00000060",
            borderRadius: "10px",
          },
        }}
      />
    </Container>
  );
};

export default App;
