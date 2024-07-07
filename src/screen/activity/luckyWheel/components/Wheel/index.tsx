import { adaptDP } from '@src/hooks/adaptive';
import { luckyPrizes } from '@src/common/data';
import { generateRandom } from '@src/utils/libs';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Svg, Circle, Path, Text, Image as Img } from 'react-native-svg';
import { getLuckyWheelDetail, selectLuckyWheelDetail } from '@src/store/slice/activity';
import { Animated, Easing, Image, TouchableOpacity, View, StyleSheet, ImageBackground, Text as TextView } from 'react-native';
import React, { Fragment, Dispatch, PropsWithChildren, SetStateAction, useEffect, useRef, useState } from 'react';
import wheel_aperture from '@res/default/images/lucky_wheel/wheel_aperture.png';
import wheel_ticket from '@res/default/images/lucky_wheel/wheel_ticket.png';
import wheel_light from '@res/default/images/lucky_wheel/wheel_light.webp';
import wheel_table from '@res/default/images/lucky_wheel/wheel_table.png';
import ImgStart from '@res/default/images/lucky_wheel/start.webp';
import global from '@src/common/styles';

// 定义组件传参 Props 类型(PropsWithChildren含默认Children<插槽>)
type SectionProps = PropsWithChildren<{
  activityId: number; // 活动ID
  setCurrentPrize: Dispatch<SetStateAction<{}>>; // 设置当前奖品
}>;

// 转盘组件
export default function WheelComponent({ activityId, setCurrentPrize }: SectionProps) {
  const dispatch = useDispatch(); // 状态管理方法实例
  const theme = useTheme(); // 主题
  const [able, setAble] = useState(false); // 是否可抽奖
  const [endAngle, setEndAngle] = useState(0); // 结束角度
  const [ableCount, setAbleCount] = useState(0); // 可抽奖次数
  const [prizes, setPrizes] = useState(luckyPrizes); // 奖品列表
  const scaleAnim = useRef(new Animated.Value(1)).current; // 缩放动画值
  const rotateWheelAnim = useRef(new Animated.Value(0)).current; // 转盘旋转动画值
  const rotateLightAnim = useRef(new Animated.Value(0)).current; // 闪烁灯旋转动画值
  const rotateApertureAnim = useRef(new Animated.Value(0)).current; // 光圈旋转动画值
  const luckyWheelDetail = useSelector(selectLuckyWheelDetail); // 幸运大转盘活动详情
  const size = adaptDP(270); // 转盘尺寸
  const radius = size / 2; // 转盘半径
  const startSize = size * 0.4; // 开始按钮尺寸
  const startRadius = startSize / 2; // 开始按钮尺寸
  let prizeIndex = 0; // 当前奖品索引

  // 初始渲染执行方法: 获取幸运大转盘活动详情
  useEffect(() => {
    forwardLightAnimation(); // 闪烁灯旋转动画
    // 光圈旋转动画
    Animated.loop(
      Animated.timing(rotateApertureAnim, {
        toValue: 360,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // 监听活动信息: 渲染转盘
  useEffect(() => {
    if (luckyWheelDetail?.awardList?.length) {
      const newPrizes = luckyWheelDetail.awardList.map((item: any) => {
        return {
          text: item.type === 'goldCoins' ? (item.amount / 100).toFixed(2) : '',
          icon: item.type !== 'nothing' && item.type !== 'goldCoins' ? require('@res/default/images/lucky_wheel/wheel_prop_Y_count.png') : '',
          image:
            item.type === 'nothing'
              ? require('@res/default/images/lucky_wheel/wheel_nothing.webp')
              : item.type === 'goldCoins'
              ? require('@res/default/images/lucky_wheel/wheel_goldCoins.webp')
              : require('@res/default/images/lucky_wheel/wheel_prop_H.webp'),
        };
      });
      setPrizes(newPrizes);
    }
    if (luckyWheelDetail?.lotteryTicketGetCount) {
      setAble(true); // 设置为可抽奖状态
      setAbleCount(luckyWheelDetail.lotteryTicketGetCount); // 设置可抽奖次数
    }
  }, [luckyWheelDetail]);

  // 闪烁灯旋转动画
  const forwardLightAnimation = () => {
    Animated.timing(rotateLightAnim, {
      toValue: 22.5,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => reverseLightAnimation(), 1000);
    });
  };

  // 反向闪烁灯旋转动画
  const reverseLightAnimation = () => {
    Animated.timing(rotateLightAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => forwardLightAnimation(), 1000);
    });
  };

  // 闪烁灯旋转动画值映射
  const RotateLightData = rotateLightAnim.interpolate({
    inputRange: [0, 45],
    outputRange: ['0deg', '45deg'],
  });

  // 光圈旋转动画值映射
  const RotateApertureData = rotateApertureAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // 转盘开始动画: 加速度
  const startWheelAnimation = () => {
    const startAngle = endAngle % 360; // 开始角度
    rotateWheelAnim.setValue(startAngle);
    Animated.timing(rotateWheelAnim, {
      toValue: 720,
      duration: 1500,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      loopWheelAnimation();
    });
  };

  // 转盘循环动画: 线性最高速
  const loopWheelAnimation = () => {
    rotateWheelAnim.setValue(0);
    Animated.loop(
      Animated.timing(rotateWheelAnim, {
        toValue: 360,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  // 转盘停止动画: 减速度
  const stopWheelAnimation = () => {
    rotateWheelAnim.stopAnimation(); // 停止之前的动画
    const stopAngle = 1440 - 90 - (360 / prizes.length) * prizeIndex - 360 / prizes.length / 2; // 停止角度
    setEndAngle(stopAngle);
    Animated.timing(rotateWheelAnim, {
      toValue: stopAngle,
      duration: 4000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      if (luckyWheelDetail.awardList[prizeIndex].type !== 'nothing') {
        dispatch(getLuckyWheelDetail(activityId)); // 获取幸运大转盘活动详情
        setCurrentPrize(luckyWheelDetail.awardList[prizeIndex]); // 设置当前奖品
      }
    });
  };

  // 转盘旋转动画值映射
  const RotateWheelData = rotateWheelAnim.interpolate({
    inputRange: [0, 3600],
    outputRange: ['0deg', '3600deg'],
  });

  // 转盘开始按钮点击事件
  const onStartPress = () => {
    if (able) {
      setAble(false); // 设置为不可抽奖状态
      applyActivity(); // 申请活动奖励
      startWheelAnimation(); // 开始转盘动画
      setAbleCount(ableCount - 1); // 可抽奖次数减1
    }
  };

  // 申请活动奖励(抽奖 & 兑换)
  const applyActivity = () => {
    prizeIndex = generateRandom(12); // 生成随机数
    const newPrize = luckyPrizes[prizeIndex]; // 获取随机奖品
    setCurrentPrize(newPrize);
    setTimeout(() => {
      stopWheelAnimation(); // 停止转盘动画
      if (ableCount) {
        setAble(true);
      }
    }, 3000);
  };

  // 转盘触摸开始回调: 缩放动画
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  // 转盘触摸结束回调: 缩放动画
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // 缩放动画值映射
  const ScaleData = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  // 渲染奖品
  const renderPrizes = () => {
    const angle = 360 / prizes.length; // 每个奖品的角度
    return prizes.map((prize, index) => {
      const isEven = index % 2 === 0; // 是否偶数
      const gap = adaptDP(1); // 奖品间隔
      const sectorAngle = angle - gap; // 扇形角度
      const rotationAngle = angle * (index + 0.5) + 90 + gap / 2; // 内容旋转角度
      const d = `M${radius} ${radius} L${radius + radius * Math.cos((angle * index * Math.PI) / 180)} ${
        radius + radius * Math.sin((angle * index * Math.PI) / 180)
      } A${radius} ${radius} 0 0 1 ${radius + radius * Math.cos(((angle * index + sectorAngle) * Math.PI) / 180)} ${
        radius + radius * Math.sin(((angle * index + sectorAngle) * Math.PI) / 180)
      } z`; // 扇区填充路径
      const textX = radius + radius * 0.85 * Math.cos((angle * (index + 0.5) * Math.PI) / 180); // 文字X坐标
      const textY = radius + radius * 0.85 * Math.sin((angle * (index + 0.5) * Math.PI) / 180); // 文字Y坐标
      const imageX = radius + radius * 0.7 * Math.cos((angle * (index + 0.5) * Math.PI) / 180); // 图片X坐标
      const imageY = radius + radius * 0.7 * Math.sin((angle * (index + 0.5) * Math.PI) / 180); // 图片Y坐标
      return (
        <Fragment key={index}>
          {/* 填充扇区 */}
          <Path d={d} fill={isEven ? '#FCCC02' : '#FFF'} />
          {/* 填充文本 */}
          {prize.text ? (
            <Text
              x={textX}
              y={textY}
              stroke="#D434CD" // 文字描边颜色
              strokeWidth="0.5" // 描边宽度
              fill="#FFF"
              textAnchor="middle"
              fontSize={adaptDP(12)}
              fontWeight="bold"
              dy=".35em"
              transform={`rotate(${rotationAngle}, ${textX}, ${textY})`}
            >
              {prize.text}
            </Text>
          ) : null}
          {/* 填充小图标 */}
          {prize.icon ? (
            <Img
              x={textX - 10}
              y={textY - 10}
              width="20"
              height="20"
              preserveAspectRatio="xMidYMid meet"
              href={prize.icon}
              transform={`rotate(${rotationAngle}, ${textX}, ${textY})`}
            />
          ) : null}
          {/* 填充奖品图片 */}
          {!prize.text && !prize.icon ? (
            <Img
              x={textX - 25}
              y={textY - 10}
              width="50"
              height="70"
              preserveAspectRatio="xMidYMid meet"
              href={prize.image}
              transform={`rotate(${rotationAngle}, ${textX}, ${textY})`}
            />
          ) : (
            <Img
              x={imageX - 15}
              y={imageY}
              width="30"
              height="30"
              preserveAspectRatio="xMidYMid meet"
              href={prize.image}
              transform={`rotate(${rotationAngle}, ${imageX}, ${imageY})`}
            />
          )}
        </Fragment>
      );
    });
  };

  return (
    <ImageBackground
      resizeMode="contain"
      source={wheel_table} // 转盘背景
      style={[styles['items-center'], { width: adaptDP(390), height: adaptDP(492.6), paddingTop: adaptDP(58) }]}
    >
      <View style={[{ width: size, height: size }]}>
        <Animated.View style={{ transform: [{ rotate: RotateWheelData }] }}>
          <Svg>
            <Circle cx={radius} cy={radius} r={radius} fill="#F7AE71" />
            {renderPrizes()}
          </Svg>
        </Animated.View>
        {/* 抽奖按钮 */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          onPress={onStartPress}
          style={[styles.start, { marginTop: -startRadius, marginLeft: -startRadius }]}
        >
          <Animated.View style={able ? { transform: [{ scale: ScaleData }] } : {}}>
            <Image resizeMode="contain" source={ImgStart} style={{ width: startSize, height: startSize }} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {/* 转盘光圈 */}
      <Animated.View pointerEvents="none" style={[styles.absolute, styles['w-vw'], { height: adaptDP(390), transform: [{ rotate: RotateApertureData }] }]}>
        <Image resizeMode="contain" source={wheel_aperture} style={[styles['w-full'], styles['h-full']]} />
      </Animated.View>
      {/* 转盘闪烁灯 */}
      <Animated.View
        pointerEvents="none"
        style={[styles.absolute, { height: adaptDP(350), width: adaptDP(350), top: adaptDP(18), transform: [{ rotate: RotateLightData }] }]}
      >
        <Image source={wheel_light} style={[styles['w-full'], styles['h-full']]} />
      </Animated.View>
      {/* 抽奖次数 */}
      <View style={[styles['flex-row'], styles.absolute, { bottom: adaptDP(30) }]}>
        <Image source={wheel_ticket} style={[styles['w-40'], styles['h-20'], styles['mr-5']]} />
        <TextView style={[{ color: theme.colors.text }, styles['text-20']]}>x{ableCount}</TextView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ...global,
  start: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
