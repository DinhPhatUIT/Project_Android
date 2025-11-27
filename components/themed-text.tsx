import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'defaultSemiBold' | 'title' | 'subtitle' | 'link';
};

export const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const typeStyle: Record<NonNullable<ThemedTextProps['type']>, TextStyle> = {
    default: {
      fontSize: 16,
    },
    defaultSemiBold: {
      fontSize: 16,
      fontWeight: '600',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '600',
    },
    link: {
      fontSize: 16,
      fontWeight: '500',
      textDecorationLine: 'underline',
    },
  };

  return <Text style={[typeStyle[type], { color }, style]} {...rest} />;
};

export default ThemedText;
