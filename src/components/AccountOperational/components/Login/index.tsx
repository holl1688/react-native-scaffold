import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { loginRequest } from '@src/store/slice/app';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Button from '@src/components/Button';
import Input from '@src/components/Input';
import global from '@src/common/styles';
import React from 'react';

export default function RegisterComponent({ setLoginTypeHandle }: { setLoginTypeHandle: Function }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  /**
   * 用户登录
   */
  const loginHandle = () => {
    dispatch(loginRequest() as any);
  };

  return (
    <View style={[styles['w-full']]}>
      <Input placeholder="Telephone" flag="br" areaCode="+55" style={[styles['mb-20']]} />
      <Input placeholder="Password" type="password" areaCode="+55" style={[styles['mb-20']]} />
      <Input placeholder="Confirm Password" type="password" areaCode="+55" style={[styles['mb-20']]} />
      <Button title="登录" textStyle={[{ color: colors.text }]} onPress={loginHandle} />
      <View style={[styles['flex-row'], styles['justify-center'], styles['mt-20']]}>
        <Text style={[{ color: colors.text }]}>还没有账号? </Text>
        <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} onPress={() => setLoginTypeHandle('register')}>
          <Text style={[{ color: colors.primary }]}> 立即注册</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...global,
});
