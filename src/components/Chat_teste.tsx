import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
            _id: 2,
            text: 'Hello world',
            createdAt: new Date(),
            user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
      };
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderBubble = (props) => {
      return(
      <Bubble 
        {...props}
        wrapperStyler = {{
            right: 
                backgroundColor: [id_mes];

            left: {
                backgroundColor: [id_mes];
            }
        }}
        textStyle = {{
            right: {
                color: '#000000';

            left: {
                color: '#000000';
            }
            }
        }}

      />
      );
  }

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
            _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        />
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});