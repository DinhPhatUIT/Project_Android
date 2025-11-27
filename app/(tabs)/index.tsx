import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { MAIN_MENU_HEIGHT } from '@/components/MainMenu';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
    <ParallaxScrollView>
    
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">DermaCare AI</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Giới thiệu</ThemedText>
        <ThemedText>
          DermaCare AI giúp bạn quản lý lịch sử phân tích da, trò chuyện với trợ lý chăm sóc da và
          truy cập các công cụ hỗ trợ khác trong cùng một ứng dụng.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Cách sử dụng nhanh</ThemedText>
        <ThemedText>
          1. Vào tab <ThemedText type="defaultSemiBold">Chatbot</ThemedText> để trò chuyện và đặt câu hỏi về làn da.
        </ThemedText>
        <ThemedText>
          2. Tab <ThemedText type="defaultSemiBold">Khám da</ThemedText> hiển thị thông báo hoặc nội dung giới thiệu ngắn.
        </ThemedText>
        <ThemedText>
          3. Các màn hình khác có thể bổ sung phân tích hình ảnh, lịch sử, lộ trình chăm sóc… theo nhu cầu của bạn.
        </ThemedText>
      </ThemedView>
      
    </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  section: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFFAA',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
