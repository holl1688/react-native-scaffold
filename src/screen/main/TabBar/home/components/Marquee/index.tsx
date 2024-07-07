import { CustomTheme } from '@src/type/theme';
import { adaptDP } from '@src/hooks/adaptive';
import { marqueeData } from '@src/common/mock';
import { useTheme } from '@react-navigation/native';
import { Text, View, StyleSheet, LayoutChangeEvent, Animated, Easing } from 'react-native';
import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import SvgBroadcast from './assets/broadcast.svg';
import global from '@src/common/styles';
import LinearGradient from 'react-native-linear-gradient';

// 跑马灯
export default function Marquee() {
  const animatedValue = useRef(new Animated.Value(0)).current; // 创建动画值
  const [marqueeList, setMarqueeList] = useState<{ content: string }[]>([]); // 跑马灯列表
  const [marqueeWidthFinal, setMarqueeWidthFinal] = useState(0); // 最终跑马灯宽度
  const [marqueeWidthTemp, setMarqueeWidthTemp] = useState(0); // 临时跑马灯宽度
  const [CalculateCount, setCalculateCount] = useState(0); // 跑马灯宽度累计次数(由子组件宽度累计)
  const [marqueeWidth, setMarqueeWidth] = useState(0); // 跑马灯总宽度
  const { colors } = useTheme() as CustomTheme; // 获取当前主题

  // 获取跑马灯数据
  useLayoutEffect(() => {
    setMarqueeList(marqueeData);
  }, []);

  // 动画样式, 在移动组件中使用
  const animatedStyle = { transform: [{ translateX: animatedValue }] };

  // 创建跑马灯动画(无限循环)
  const marqueeAnimated = Animated.loop(
    Animated.timing(animatedValue, {
      toValue: -marqueeWidth, // 向左移动, 距离为跑马灯总宽度
      duration: marqueeWidth * 10, // 速度 = 跑马灯总宽度 * 10 (10毫秒移动1dp)
      easing: Easing.linear, // 线性变化 - 匀速
      useNativeDriver: true,
    }),
    { iterations: -1 }, // 无限循环
  );

  // 监听跑马灯总宽度(宽度变化时触发动画)
  useEffect(() => {
    // 如果跑马灯总宽度和最终跑马灯宽度不相等, 则设置最终跑马灯宽度并开始动画
    if (marqueeWidth && marqueeWidthFinal !== marqueeWidth) {
      setMarqueeWidthFinal(marqueeWidth);
      marqueeAnimated.start();
    }
  }, [marqueeAnimated, marqueeWidth, marqueeWidthFinal]);

  // 获取跑马灯总宽度
  const MarqueeLayout = (event: LayoutChangeEvent) => {
    // 如果计算次数小于跑马灯列表长度, 则计算临时宽度并增加计算次数
    if (CalculateCount < marqueeList.length) {
      setMarqueeWidthTemp(marqueeWidthTemp + event.nativeEvent.layout.width);
      setCalculateCount(CalculateCount + 1);
    }
    // 如果计算次数等于跑马灯列表长度-1, 则设置跑马灯总宽度
    if (CalculateCount === marqueeList.length - 1) {
      setMarqueeWidth(marqueeWidthTemp + event.nativeEvent.layout.width);
    }
  };

  return (
    <View style={[styles['height-50'], styles.justifyCenter]}>
      {/* 跑马灯滚动内容 */}
      <Animated.View style={[styles['height-full'], styles.row, styles.itemsCenter, styles.absolute, animatedStyle]}>
        {marqueeList.map((item, index) => (
          <Text onLayout={MarqueeLayout} style={[styles['pl-vw'], { color: colors.primary }]} key={index}>
            {item.content}
          </Text>
        ))}
      </Animated.View>
      <View style={[styles['w-full'], styles['flex-row'], styles['justify-between']]}>
        {/* 前置图标 */}
        <LinearGradient
          style={[styles['pl-10'], styles['h-30'], styles['w-60']]}
          colors={[colors.background, colors.background, `${colors.background}00`]}
          locations={[0, 0.65, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <SvgBroadcast height="100%" width="50%" color={colors.text} />
        </LinearGradient>
        {/* 后置渐变浮层 */}
        <LinearGradient
          style={[styles['h-30'], styles['w-60']]}
          colors={[`${colors.background}00`, colors.background, colors.background]}
          locations={[0, 0.65, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...global,
  row: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  widthAuto: {
    width: 'auto',
  },
  visible: {
    overflow: 'visible',
  },
  absolute: {
    position: 'absolute',
  },
  'height-full': {
    height: '100%',
  },
  'shrink-0': {
    flexShrink: 0,
  },
  'height-50': {
    height: 50,
  },
  'bg-white': {
    backgroundColor: '#fff',
  },
  'pl-vw': {
    paddingLeft: adaptDP(390),
  },
});
