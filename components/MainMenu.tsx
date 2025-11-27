import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const MAIN_MENU_HEIGHT = 72;

const TAB_CONFIG: Record<string, { label: string; icon: keyof typeof Ionicons.glyphMap }> = {
  index: { label: 'Tổng quan', icon: 'home-outline' },
  explore: { label: 'Khám da', icon: 'compass-outline' },
  chatbot: { label: 'Chatbot', icon: 'chatbubble-ellipses-outline' },
};

const MainMenu: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.safeArea, { backgroundColor: palette.background }]}
    >
      <View
        style={[
          styles.container,
          {
            borderBottomColor: palette.tabIconDefault + '33',
            backgroundColor: palette.background,
          },
        ]}
      >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const config = TAB_CONFIG[route.name] ?? { label: options.title ?? route.name, icon: 'ellipse-outline' };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={(options as any).tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={({ pressed }) => [
              styles.item,
              { borderColor: isFocused ? palette.tint : 'transparent', opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons
              name={config.icon}
              size={22}
              color={isFocused ? palette.tabIconSelected : palette.tabIconDefault}
            />
            <Text style={[styles.label, { color: isFocused ? palette.tabIconSelected : palette.icon }]}>
              {config.label}
            </Text>
          </Pressable>
        );
      })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: MAIN_MENU_HEIGHT,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 8,
    marginHorizontal: 6,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});

export default MainMenu;
