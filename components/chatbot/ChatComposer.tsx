import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatComposer: React.FC<ChatComposerProps> = ({ onSend, disabled = false }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) {
      return;
    }
    onSend(trimmed);
    setValue('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 16, android: 0 })}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Viết tin nhắn cho trợ lý da liễu..."
          placeholderTextColor="#9CA3AF"
          multiline
          value={value}
          onChangeText={setValue}
          editable={!disabled}
          maxLength={500}
        />
        <Pressable
          accessibilityLabel="Gửi tin nhắn"
          accessibilityHint="Nhập nội dung câu hỏi"
          style={({ pressed }) => [styles.sendButton, pressed && styles.sendButtonPressed, disabled && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={disabled}
        >
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={styles.sendLabel}>Gửi</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
    fontSize: 15,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  sendButtonPressed: {
    opacity: 0.8,
  },
  sendButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  sendLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default ChatComposer;
