import { View } from 'react-native';
import { sortTabs } from '@src/common/mock';
import LinearGradient from 'react-native-linear-gradient';
import Segment from '@src/components/Segment';
import styles from '@src/common/styles';
import SvgFind from '@res/svg/find.svg';
import React from 'react';
import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function SortTabBar() {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={[styles['w-full'], styles['flex-row'], styles['items-center']]}>
      {/* 分类滚动标签栏 */}
      <View style={[styles['flex-1']]}>
        <Segment tabs={sortTabs} />
      </View>
      {/* 右侧功能占位 */}
      <View style={[styles['w-40']]} />
      {/* 渐变遮罩(点击穿透 */}
      <View style={[styles.absolute, styles['w-80'], styles['h-full'], styles['right-10']]} pointerEvents="none">
        <LinearGradient
          style={[styles['flex-1'], styles['items-end'], styles['justify-center'], styles['right-10']]}
          colors={[`${theme.colors.background}00`, theme.colors.background, theme.colors.background]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </View>
      {/* 右侧功能按钮 */}
      <View style={[styles.absolute, styles['w-40'], styles['h-full'], styles['right-10'], styles['items-end'], styles['justify-center']]}>
        <TouchableHighlight underlayColor="transparent" onPress={() => console.info('search')}>
          <SvgFind width={30} height={30} color={theme.colors.primary} />
        </TouchableHighlight>
      </View>
    </View>
  );
}
