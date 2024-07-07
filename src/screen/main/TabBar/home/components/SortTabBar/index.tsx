import { View } from 'react-native';
import { sortTabs } from '@src/common/mock';
import LinearGradient from 'react-native-linear-gradient';
import Segment from '@src/components/Segment';
import styles from '@src/common/styles';
import SvgFind from '@res/svg/find.svg';
import React from 'react';
import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';

export default function SortTabBar() {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={[styles['w-full'], styles['flex-row'], styles['items-center']]}>
      <View style={[styles['flex-1']]}>
        <Segment tabs={sortTabs} />
      </View>
      <View style={[styles['w-40']]} />
      <LinearGradient
        style={[styles.absolute, styles['w-80'], styles['h-full'], styles['items-end'], styles['justify-center'], styles['right-10']]}
        colors={[`${theme.colors.background}00`, theme.colors.background, theme.colors.background]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <SvgFind width={30} height={30} color={theme.colors.primary} />
      </LinearGradient>
    </View>
  );
}
