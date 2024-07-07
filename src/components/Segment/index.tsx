import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { ScrollView, View, TouchableOpacity, Text, LayoutChangeEvent } from 'react-native';
import React, { useRef, useState } from 'react';
import styles from '@src/common/styles';

let tabPositions: number[] = [];

export default function Segment({
  tabs,
  RenderTab,
  onPress,
}: {
  tabs: Record<string, any>[];
  RenderTab?: ({ tab, activeIndex, index }: { tab: Record<string, any>; activeIndex: number; index: number }) => JSX.Element;
  onPress?: (index: number) => void;
}) {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0); // 新增状态来存储ScrollView的宽度
  const [activeIndex, setActiveIndex] = useState(0); // 新增状态来存储当前激活的tab索引
  const { colors } = useTheme() as CustomTheme;

  const handlePress = (index: number) => {
    const targetPosition = tabPositions[index] - scrollViewWidth / 2; // 计算滚动位置<目标元素位于滚动视图中心>(目标初始位置减二分一滚动视图宽度)
    scrollViewRef.current?.scrollTo({ x: targetPosition, animated: true });
    setActiveIndex(index);
    onPress && onPress(index);
  };

  const handleChildLayout = (e: LayoutChangeEvent, index: number) => {
    tabPositions[index] = e.nativeEvent.layout.x; // 记录每个tab的x坐标
  };

  return (
    <View style={[styles['w-full'], styles['h-46']]}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles['items-center']]}
        onLayout={event => {
          setScrollViewWidth(event.nativeEvent.layout.width); // 记录ScrollView的宽度
        }}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onLayout={(e: LayoutChangeEvent) => handleChildLayout(e, index)}
            onPress={() => handlePress(index)}
            style={[styles['mx-10']]}
          >
            {RenderTab ? (
              <RenderTab tab={tab} activeIndex={activeIndex} index={index} />
            ) : (
              <View
                style={[styles['flex-row'], styles['items-center'], styles['px-10'], styles['py-5'], styles['rounded-30'], { backgroundColor: colors.card }]}
              >
                {tab.icon}
                <Text style={[{ color: colors.text }]}>{tab.title}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
