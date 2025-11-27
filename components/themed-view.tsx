import React from 'react';
import { View, ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView: React.FC<ThemedViewProps> = ({ style, lightColor, darkColor, ...rest }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...rest} />;
};

export default ThemedView;
