import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { StyleProp, TouchableHighlight, View, ViewStyle, Text, StyleSheet, TextStyle } from 'react-native';
import global from '@src/common/styles';
import React, { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>; // 允许传递任何视图样式<对象或数组>
  disable?: boolean;
  onPress: () => void;
}

export default function Button({ children, style, title, textStyle, prefix, suffix, disable = false, onPress }: ButtonProps) {
  const { colors, layout } = useTheme() as CustomTheme;
  const flattenStyle = StyleSheet.flatten(style);
  const textStyles = StyleSheet.flatten(textStyle);

  return (
    <TouchableHighlight
      underlayColor="transparent"
      activeOpacity={disable ? 1 : 0.5}
      onPress={onPress}
      style={[styles.hidden, { borderRadius: flattenStyle?.borderRadius || layout.radius }]}
    >
      <View
        style={[
          styles['h-46'],
          styles['flex-row'],
          styles['items-center'],
          styles['justify-center'],
          styles['px-10'],
          { backgroundColor: colors.buttonBackdrop },
          flattenStyle,
        ]}
      >
        {prefix}
        {children ?? <Text style={[styles['text-14'], styles['weight-700'], { color: colors.text }, textStyles]}>{title}</Text>}
        {suffix}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  ...global,
});
