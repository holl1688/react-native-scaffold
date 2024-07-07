import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { StyleProp, Text as TextComponent, TextStyle, StyleSheet } from 'react-native';
import React from 'react';

export default function Text({ children = '', style }: { children?: string; style?: StyleProp<TextStyle> }) {
  const { colors } = useTheme() as CustomTheme;
  const flattenStyle = StyleSheet.flatten(style);

  return <TextComponent style={[{ color: colors.text }, flattenStyle]}>{children}</TextComponent>;
}
