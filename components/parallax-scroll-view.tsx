import React, { PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

interface ParallaxScrollViewProps extends ScrollViewProps {
  headerImage?: React.ReactNode;
  headerBackgroundColor?: {
    light: string;
    dark: string;
  };
}

const ParallaxScrollView: React.FC<PropsWithChildren<ParallaxScrollViewProps>> = ({
  children,
  headerImage,
  headerBackgroundColor,
  contentContainerStyle,
  ...rest
}) => {
  const scheme = useColorScheme() ?? 'light';
  return (
    <ScrollView
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      {...rest}
    >
      <View
        style={[
          styles.header,
          headerBackgroundColor
            ? { backgroundColor: headerBackgroundColor[scheme] ?? headerBackgroundColor.light }
            : null,
        ]}
      >
        {headerImage}
      </View>
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    height: 240,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  inner: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default ParallaxScrollView;
