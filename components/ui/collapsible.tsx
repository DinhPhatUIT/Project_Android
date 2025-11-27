import React, { PropsWithChildren, useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/use-theme-color';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleProps {
  title: string;
}

export const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const borderColor = useThemeColor({}, 'tabIconDefault');
  const textColor = useThemeColor({}, 'text');

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(prev => !prev);
  };

  return (
    <View style={[styles.container, { borderColor: borderColor + '66' }]}> 
      <Pressable style={styles.header} onPress={toggle}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={textColor}
        />
      </Pressable>
      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    marginTop: 12,
  },
});
