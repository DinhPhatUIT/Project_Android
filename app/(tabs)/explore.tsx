import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MAIN_MENU_HEIGHT } from '@/components/MainMenu';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Hello</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: MAIN_MENU_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
});
