import React from 'react';
import { Linking, Pressable, PressableProps } from 'react-native';

interface ExternalLinkProps extends PressableProps {
  href: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, onPress, ...rest }) => {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(href);
      if (supported) {
        await Linking.openURL(href);
      }
    } catch (error) {
      console.warn('Failed to open URL', error);
    }
  };

  return (
    <Pressable
      onPress={async event => {
        await handlePress();
        onPress?.(event);
      }}
      {...rest}
    />
  );
};
