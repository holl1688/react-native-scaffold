import { useModal } from '../ModalProvider';
import { useTheme } from '@react-navigation/native';
import { capitalizeFirstLetter } from '@src/utils/libs';
import { StyleSheet, View, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import SvgClose from '@src/assets/default/svg/close.svg';
import Texture from '@res/default/images/bg-login.png';
import RegisterComponent from './components/Register';
import LoginComponent from './components/Login';
import global from '@src/common/styles';

// 定义组件传参 Props 类型(PropsWithChildren含默认Children<插槽>)
type LoginProps = PropsWithChildren<{
  type?: string;
}>;

/**
 * 登录弹窗组件
 * @param param type: 登录框类型
 */
export default function LoginModal({ type }: LoginProps) {
  const { colors } = useTheme();
  const { hideModal } = useModal();
  const [component, setComponent] = useState(<></>);
  const [loginType, setLoginType] = useState(type || 'login');

  // 监听登录框类型变化
  useEffect(() => {
    if (loginType === 'register') {
      setComponent(<RegisterComponent setLoginTypeHandle={setLoginType} />);
    } else {
      setComponent(<LoginComponent setLoginTypeHandle={setLoginType} />);
    }
  }, [loginType]);

  return (
    <TouchableWithoutFeedback>
      <View style={[styles['w-5/6'], styles['rounded-10'], styles.hidden]}>
        <ImageBackground
          source={Texture}
          resizeMode="cover"
          style={[styles['py-20'], styles['px-16'], styles['items-center'], { backgroundColor: `${'rgba(45, 45, 45, .98)'}` }]}
        >
          <Text style={[styles['text-40'], styles['weight-700'], styles['mb-20'], { color: colors.text }]}>{capitalizeFirstLetter(loginType)}</Text>
          <View style={[styles.absolute, styles['right-20'], styles['top-20']]}>
            <TouchableWithoutFeedback onPress={() => hideModal()}>
              <View style={[styles['w-20'], styles['h-20']]}>
                <SvgClose width="100%" height="100%" color={colors.text} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {component}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

// 样式
const styles = StyleSheet.create({
  ...global,
});
