import { useModal } from '../ModalProvider';
import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { capitalizeFirstLetter } from '@src/utils/libs';
import { View, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import SvgClose from '@src/assets/default/svg/close.svg';
import Texture from '@res/default/images/bg-login.png';
import styles from '@src/common/styles';
import React from 'react';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '@src/store/slice/app';

/**
 * 对话框
 */
export default function Dialog() {
  const dispatch = useDispatch();
  const { colors } = useTheme() as CustomTheme;
  const { hideModal } = useModal();

  /**
   * 取消操作
   */
  const cancelHandle = () => {
    hideModal();
  };

  /**
   * 确认退出登录
   */
  const confirmHandle = () => {
    dispatch(logoutRequest() as any);
    hideModal();
  };
  return (
    <TouchableWithoutFeedback>
      <View style={[styles['w-5/6'], styles['rounded-10'], styles.hidden]}>
        <ImageBackground
          source={Texture}
          resizeMode="cover"
          style={[styles['py-20'], styles['px-16'], styles['items-center'], { backgroundColor: `${'rgba(45, 45, 45, 0.6)'}` }]}
        >
          <Text style={[styles['text-20'], styles['weight-700'], { color: colors.text }]}>{capitalizeFirstLetter('logout')}</Text>
          <Text style={[styles['text-14'], styles['weight-700'], styles['my-30'], { color: colors.blurText }]}>
            {capitalizeFirstLetter('are you sure you want to log out?')}
          </Text>
          <View style={[styles.absolute, styles['right-20'], styles['top-20']]}>
            <TouchableWithoutFeedback onPress={() => hideModal()}>
              <View style={[styles['w-20'], styles['h-20']]}>
                <SvgClose width="100%" height="100%" color={colors.text} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles['w-full'], styles['flex-row'], styles['justify-around']]}>
            <View style={[styles['w-2/5']]}>
              <Button style={[styles['w-full'], { backgroundColor: colors.card }]} onPress={cancelHandle} title={capitalizeFirstLetter('cancel')} />
            </View>
            <View style={[styles['w-2/5']]}>
              <Button style={[styles['w-full']]} onPress={confirmHandle} title={capitalizeFirstLetter('confirm')} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
