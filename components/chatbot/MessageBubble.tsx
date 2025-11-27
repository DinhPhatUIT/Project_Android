import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ChatSender = 'user' | 'bot';

export interface MessageBubbleProps {
  sender: ChatSender;
  text: string;
  timestamp?: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text }) => {
  const isUser = sender === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  botContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: '#0a7ea4',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#F2F2F5',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#1A1C20',
  },
});

export default MessageBubble;
