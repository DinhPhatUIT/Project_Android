import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatComposer from '@/components/chatbot/ChatComposer';
import MessageBubble, { ChatSender } from '@/components/chatbot/MessageBubble';
import { MAIN_MENU_HEIGHT } from '@/components/MainMenu';

interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: number;
}

const createId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const TypingIndicator = () => (
  <View style={styles.typingContainer}>
    <View style={styles.typingDot} />
    <View style={[styles.typingDot, styles.typingDotMid]} />
    <View style={styles.typingDot} />
    <Text style={styles.typingLabel}>Trợ lý đang soạn phản hồi...</Text>
  </View>
);

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId(),
      sender: 'bot',
      text: 'Xin chào! Tôi là trợ lý chăm sóc da ảo. Bạn muốn mình hỗ trợ điều gì hôm nay?',
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const pushMessage = useCallback((sender: ChatSender, text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: createId(),
        sender,
        text,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const generateBotReply = useCallback((userMessage: string): string => {
    if (userMessage.length < 3) {
      return 'Mình chưa hiểu rõ câu hỏi. Bạn mô tả chi tiết hơn giúp mình nhé!';
    }

    if (/mụn|acne|nổi/.test(userMessage.toLowerCase())) {
      return 'Để kiểm soát mụn, bạn nên làm sạch dịu nhẹ hai lần mỗi ngày, dùng sản phẩm chứa BHA hoặc retinoid phù hợp, đồng thời dưỡng ẩm không gây bít tắc. Nếu mụn viêm nặng, hãy gặp bác sĩ da liễu.';
    }

    if (/dưỡng ẩm|khô|hydration/.test(userMessage.toLowerCase())) {
      return 'Bạn có thể ưu tiên sữa rửa mặt dịu nhẹ, thêm serum chứa hyaluronic acid và khóa ẩm với kem có ceramide. Đừng quên uống đủ nước và hạn chế điều hòa quá lạnh.';
    }

    return 'Mình đã ghi nhận thắc mắc của bạn. Bạn có thể chia sẻ thêm về loại da, tình trạng hiện tại hoặc sản phẩm bạn đang dùng để mình tư vấn cụ thể hơn nhé!';
  }, []);

  const handleSend = useCallback(
    (userText: string) => {
      pushMessage('user', userText);
      setIsTyping(true);

      setTimeout(() => {
        const reply = generateBotReply(userText);
        pushMessage('bot', reply);
        setIsTyping(false);
      }, 900);
    },
    [generateBotReply, pushMessage],
  );

  const renderItem = useCallback(({ item }: { item: ChatMessage }) => (
    <MessageBubble sender={item.sender} text={item.text} timestamp={item.timestamp} />
  ), []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Trò chuyện cùng AI</Text>
        <Text style={styles.screenSubtitle}>Chia sẻ về làn da và nhận tư vấn ngay lập tức.</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {isTyping && <TypingIndicator />}
      <ChatComposer onSend={handleSend} disabled={isTyping} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingTop: MAIN_MENU_HEIGHT,
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  screenSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#475569',
  },
  listContent: {
    paddingVertical: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94A3B8',
    marginRight: 4,
  },
  typingDotMid: {
    marginHorizontal: 4,
    opacity: 0.65,
  },
  typingLabel: {
    fontSize: 13,
    color: '#475569',
    marginLeft: 8,
  },
});

export default ChatbotScreen;
