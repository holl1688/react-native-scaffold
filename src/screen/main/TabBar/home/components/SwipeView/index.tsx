import { adaptDP } from '@src/hooks/adaptive';
import { CustomTheme } from '@src/type/theme';
import { carouselData } from '@src/common/mock';
import { useTheme } from '@react-navigation/native';
import { View, Image, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Carousel, { CarouselRenderItem } from 'react-native-reanimated-carousel';
import styles from '@src/common/styles';
import React, { useState } from 'react';

// 轮播图指示器
const CarouselIndicator = ({ activeIndex, style }: { activeIndex: number; style: StyleProp<ViewStyle> }) => {
  const { colors } = useTheme() as CustomTheme;
  const flattenStyle = StyleSheet.flatten(style);

  return (
    <View style={[styles['flex-row'], styles['items-center'], styles['py-10'], flattenStyle]}>
      {carouselData.map((_, index) => (
        <View
          key={index}
          style={[
            styles['h-5'],
            styles['rounded-30'],
            styles['mx-3'],
            { backgroundColor: activeIndex === index ? colors.primary : colors.blurText, width: activeIndex === index ? adaptDP(20) : adaptDP(8) },
          ]}
        />
      ))}
    </View>
  );
};

// 轮播图子元素
const CarouselItem: CarouselRenderItem<{
  title: string;
  imageUrl: string;
}> = ({ item }) => {
  const { layout } = useTheme() as CustomTheme;

  return (
    <View style={[styles['w-full'], styles['h-full']]}>
      <Image source={{ uri: item.imageUrl }} style={[styles['w-full'], styles['h-full'], { borderRadius: layout.radius }]} />
    </View>
  );
};

// 轮播图组件
export default function SwipeView() {
  const { layout } = useTheme() as CustomTheme;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={[styles['mt-10'], styles['mb-20'], styles['justify-center'], styles['items-center']]}>
      <Carousel
        loop
        autoPlay
        data={carouselData}
        autoPlayInterval={2500}
        renderItem={CarouselItem}
        width={styles['w-366'].width}
        height={styles['h-160'].height}
        style={[{ borderRadius: layout.radius }]}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <CarouselIndicator style={[styles['-mt-30']]} activeIndex={activeIndex} />
    </View>
  );
}
