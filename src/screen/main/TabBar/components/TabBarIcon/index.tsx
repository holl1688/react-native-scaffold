import { Animated } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, FC } from 'react';

// 底部导航图标
export default function TabBarIcon(Component: FC<SvgProps>, ActiveComponent: FC<SvgProps>) {
  const TabBarHomeIconComponent = ({ color, size }: { focused: boolean; color: string; size: number }) => {
    const isFocused = useIsFocused(); // 是否聚焦(传入的focused无法使用函数监听)
    const animationValue = useRef(new Animated.Value(0)).current; // 动画值

    // 动画样式, 在移动组件中使用
    const animatedStyle = { transform: [{ scale: animationValue }] };

    // 监听焦点变化执行动画
    useEffect(() => {
      if (isFocused) {
        // 连续执行多个动画
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        animationValue.setValue(0); // 如果失去焦点重置动画值
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);
    return (
      <Animated.View style={isFocused ? animatedStyle : {}}>
        {isFocused ? <ActiveComponent width={size} height={size} color={color} /> : <Component width={size} height={size} color={color} />}
      </Animated.View>
    );
  };
  return TabBarHomeIconComponent;
}
