import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { View, TextInput, StyleSheet, ViewStyle, StyleProp, TouchableWithoutFeedback, Text } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import SvgClose from '@src/assets/default/svg/close.svg';
import SvgEyeOff from './assets/eye-off.svg';
import Flag from '@src/components/Flag';
import global from '@src/common/styles';
import SvgEye from './assets/eye.svg';

interface InputProps {
  style?: StyleProp<ViewStyle>; // 允许传递任何视图样式<对象或数组>
  flag?: string;
  type?: string;
  areaCode?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

const eyeComponent = (showPassword: boolean, setShowPassword: Function, colors: CustomTheme['colors']) => (
  <View style={[styles['h-full'], styles['justify-center']]}>
    <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
      <View style={[styles['w-20'], styles['h-20']]}>
        {showPassword ? <SvgEye width="100%" height="100%" color={colors.blurText} /> : <SvgEyeOff width="100%" height="100%" color={colors.blurText} />}
      </View>
    </TouchableWithoutFeedback>
  </View>
);

export default function Input({ style, flag, type, autoFocus, areaCode, placeholder }: InputProps) {
  const flattenStyle = StyleSheet.flatten(style);
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [suffix, setSuffix] = useState<JSX.Element | null>(null);
  const { colors, layout } = useTheme() as CustomTheme;

  const clearInput = () => {
    inputRef.current?.clear();
    setInputValue('');
  };

  useLayoutEffect(() => {
    if (type === 'password') {
      setSuffix(eyeComponent(showPassword, setShowPassword, colors));
    }
  }, [type, showPassword, colors]);

  return (
    <View
      style={[
        styles['w-full'],
        styles['h-44'],
        styles.border,
        styles['flex-row'],
        styles['px-10'],
        styles['items-center'],
        { borderColor: colors.border, borderRadius: layout.radius, backgroundColor: colors.inputBackdrop },
        flattenStyle,
      ]}
    >
      {flag ? (
        <View style={[styles['flex-row'], styles['items-center']]}>
          <Flag
            style={[styles['rounded-30'], styles.hidden]}
            country="br"
            width={Number(flattenStyle?.height) - 20 || 20}
            height={Number(flattenStyle?.height) - 20 || 20}
          />
          <View style={[styles['mx-10'], styles['pr-10'], { borderRightWidth: Number(2), borderColor: colors.blurText }]}>
            <Text style={[{ color: colors.text }]}>{areaCode}</Text>
          </View>
        </View>
      ) : null}
      <View style={[styles['flex-1'], styles['justify-center']]}>
        <TextInput
          ref={inputRef}
          value={inputValue}
          autoFocus={autoFocus}
          placeholder={placeholder}
          selectionColor={colors.text}
          placeholderTextColor={colors.blurText}
          onChangeText={text => setInputValue(text)}
          secureTextEntry={type === 'password' && !showPassword}
          style={[styles['h-full'], styles['w-full'], { color: colors.text }]}
        />
        {inputValue.length ? (
          <TouchableWithoutFeedback onPress={clearInput}>
            <View
              style={[
                styles['w-15'],
                styles['h-15'],
                styles.absolute,
                styles['right-10'],
                styles['rounded-30'],
                styles['p-3'],
                { backgroundColor: colors.blurText },
              ]}
            >
              <SvgClose width="100%" height="100%" color={colors.inputBackdrop} />
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      {type === 'password' ? suffix : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ...global,
});
