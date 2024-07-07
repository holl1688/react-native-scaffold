import { useTheme } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Button from '@src/components/Button';
import Input from '@src/components/Input';
import global from '@src/common/styles';
import React from 'react';

export default function RegisterComponent({ setLoginTypeHandle }: { setLoginTypeHandle: Function }) {
  const { colors } = useTheme();

  return (
    <View style={[styles['w-full']]}>
      <Input placeholder="Telephone" flag="br" areaCode="+55" style={[styles['mb-20']]} />
      <Input placeholder="Password" type="password" areaCode="+55" style={[styles['mb-20']]} />
      <Input placeholder="Confirm Password" type="password" areaCode="+55" style={[styles['mb-20']]} />
      <Button title="注册" textStyle={[{ color: colors.text }]} onPress={() => {}} />
      <View style={[styles['flex-row'], styles['justify-center'], styles['mt-20']]}>
        <Text style={[{ color: colors.text }]}>已有账号? </Text>
        <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} onPress={() => setLoginTypeHandle('login')}>
          <Text style={[{ color: colors.primary }]}> 马上登录</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...global,
});
