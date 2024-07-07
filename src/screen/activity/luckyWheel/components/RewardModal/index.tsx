import { adaptDP } from '@src/hooks/adaptive';
import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { Animated, Modal, View, Image, TouchableWithoutFeedback, Easing } from 'react-native';
import wheel_goldCoins from '@res/default/images/lucky_wheel/wheel_goldCoins.webp';
import SvgRewardLight from '@res/default/svg/lucky_wheel/wheel_reward_light.svg';
import React, { Dispatch, PropsWithChildren, useEffect, useRef } from 'react';
import Text from '@src/components/Text';
import styles from '@src/common/styles';

// 定义组件传参 Props 类型(PropsWithChildren含默认Children<插槽>)
type SectionProps = PropsWithChildren<{
  visible: boolean; // 是否显示
  setRewardModalVisible: Dispatch<React.SetStateAction<boolean>>; // 设置奖品弹窗显示状态
  setCurrentPrize: Dispatch<React.SetStateAction<{}>>; // 设置当前奖品
}>;

/**
 * 奖品弹窗组件
 */
export default function RewardModalComponent({ visible, setRewardModalVisible, setCurrentPrize }: SectionProps) {
  const { colors } = useTheme() as CustomTheme;
  const rotateLightAnim = useRef(new Animated.Value(0)).current; // 光圈旋转动画
  const scaleXCardAnim = useRef(new Animated.Value(1)).current; // 卡片水平翻转动画
  const scaleCardAnim = useRef(new Animated.Value(0)).current; // 卡片缩放动画

  // 初始化渲染执行方法
  useEffect(() => {
    // 光圈旋转动画
    Animated.loop(
      Animated.timing(rotateLightAnim, {
        toValue: 360,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 监听显示状态变化
  useEffect(() => {
    if (visible) {
      // 卡片翻转并放大动画
      Animated.parallel([
        // 卡片翻转动画
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleXCardAnim, {
              toValue: -1,
              duration: 125,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXCardAnim, {
              toValue: 1,
              duration: 125,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
          {
            iterations: 4,
          },
        ),
        // 卡片放大动画
        Animated.timing(scaleCardAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setCurrentPrize({}); // 重置当前奖品
      scaleCardAnim.setValue(0); // 重置卡片缩放动画值
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // 光圈旋转动画值映射
  const RotateLightData = rotateLightAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal transparent={true} visible={visible}>
      <View style={[styles['flex-1'], styles['items-center'], styles['justify-center']]}>
        <Animated.View style={[{ transform: [{ scaleX: scaleXCardAnim }, { scale: scaleCardAnim }] }]}>
          <View style={[{ width: adaptDP(223), height: adaptDP(270) }, styles['rounded-10'], { backgroundColor: `${'#6D1AD4'}` }]}>
            <Animated.View style={[styles.absolute, styles['w-full'], styles['h-full'], { transform: [{ rotate: RotateLightData }] }]}>
              <SvgRewardLight width="100%" height="100%" style={[styles.absolute]} />
            </Animated.View>
            <View style={[styles['w-full'], styles['h-full'], styles['items-center'], styles['justify-between'], styles['p-20']]}>
              <Text style={[{ color: colors.primary }, styles['text-20']]}>恭喜您获得</Text>
              <Image resizeMode="contain" source={wheel_goldCoins} style={[styles['w-100'], styles['h-100']]} />
              <TouchableWithoutFeedback onPress={() => setRewardModalVisible(false)}>
                <View style={[{ backgroundColor: colors.primary }, styles['items-center'], styles['w-100'], styles['py-10'], styles['rounded-8']]}>
                  <Text>确定</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
