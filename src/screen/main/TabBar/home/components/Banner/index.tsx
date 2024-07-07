import styles from '@src/common/styles';
import React, { useLayoutEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { BannerData } from '@src/common/mock';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@src/type/theme';
import GradientText from '@src/components/GradientText';

// 横幅元素
function BannerItem({ image, title }: { image: string; title: string }) {
  const { layout } = useTheme() as CustomTheme;

  return (
    <View style={[styles['w-1/3'], styles['px-5']]}>
      <View style={[styles.hidden, { borderRadius: layout.radius }]}>
        <ImageBackground source={{ uri: image }} style={[styles['h-100'], { borderRadius: layout.radius }]}>
          <GradientText text={title} />
        </ImageBackground>
      </View>
    </View>
  );
}

export default function Banner() {
  const [bannerList, setBannerList] = useState<Record<string, string>[]>([]);

  useLayoutEffect(() => {
    setBannerList(BannerData);
  }, []);

  return (
    <View style={[styles['px-5'], styles['flex-row']]}>
      {bannerList.map(item => (
        <BannerItem image={item.image} title={item.title} key={item.title} />
      ))}
    </View>
  );
}
