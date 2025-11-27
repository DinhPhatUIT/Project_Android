import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconSymbolProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = '#0a7ea4', style }) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
