import { CustomTheme } from '@src/type/theme';
import { popularData } from '@src/common/mock';
import { useTheme } from '@react-navigation/native';
import { View, Text, ImageBackground } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import SvgPopular from '@res/default/svg/sort/POPULAR.svg';
import Button from '@src/components/Button';
import styles from '@src/common/styles';

// 分片元素
const CarouselItem = ({ index }: { item: number; index: number }) => {
  const { layout } = useTheme() as CustomTheme;
  const [allData, setAllData] = useState<Record<string, any>[]>([]); // 数据

  useEffect(() => {
    setAllData(popularData.slice(index * 9, (index + 1) * 9));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles['flex-row'], styles['flex-wrap']]}>
      {allData.map((it: any) => (
        <View style={[styles['w-1/3'], styles['p-5'], { aspectRatio: Number(0.85) }]} key={it.id}>
          <View style={[styles.hidden, { borderRadius: layout.radius }]}>
            <ImageBackground style={[styles['w-full'], styles['h-full']]} source={{ uri: it.image }} />
          </View>
        </View>
      ))}
    </View>
  );
};

// 热门视图
export default function PopularView() {
  const carouselRef = useRef<ICarouselInstance | null>(null);
  const { colors, layout } = useTheme() as CustomTheme;
  const [activeIndex, setActiveIndex] = useState<number>(0); // 当前索引
  const [carouselData, setCarouselData] = useState<number[]>([]); // 轮播数据

  useLayoutEffect(() => {
    setCarouselData([...Array(Math.ceil(popularData.length / 9)).keys()]);
  }, []);

  return (
    <View style={[styles['p-5']]}>
      <View style={[styles['flex-row'], styles['items-center'], styles['justify-between'], styles['p-5']]}>
        <View style={[styles['flex-row'], styles['items-center']]}>
          <SvgPopular width={40} height={40} color="red" />
          <Text style={[styles['weight-700'], styles['text-20'], { color: colors.text }]}>Popular</Text>
        </View>
        <View style={[styles['flex-row'], styles['items-center']]}>
          <Button style={[styles['h-30'], { backgroundColor: colors.card }]} onPress={() => {}}>
            <Text style={[{ color: colors.blurText }]}>All </Text>
            <Text style={[{ color: colors.primary }, styles['weight-700']]}>19</Text>
          </Button>
          <View style={[styles['mx-5']]}>
            <Button
              disable={activeIndex <= 0}
              style={[styles['h-30'], { backgroundColor: colors.card }]}
              textStyle={[{ color: activeIndex > 0 ? colors.text : colors.blurText }]}
              title="<"
              onPress={() => carouselRef.current?.prev()}
            />
          </View>
          <Button
            disable={activeIndex >= carouselData.length - 1}
            style={[styles['h-30'], { backgroundColor: colors.card }]}
            textStyle={[{ color: activeIndex >= carouselData.length - 1 ? colors.blurText : colors.text }]}
            title=">"
            onPress={() => carouselRef.current?.next()}
          />
        </View>
      </View>
      <Carousel
        loop={false}
        ref={carouselRef}
        data={carouselData}
        renderItem={CarouselItem}
        width={styles['w-380'].width}
        height={styles['h-448'].height}
        style={[{ borderRadius: layout.radius }]}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
}
