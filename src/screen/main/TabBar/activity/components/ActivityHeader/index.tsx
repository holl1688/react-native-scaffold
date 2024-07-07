import { View } from 'react-native';
import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';
import { capitalizeEachWord } from '@src/utils/libs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Segment from '@src/components/Segment';
import Text from '@src/components/Text';
import styles from '@src/common/styles';
import React from 'react';

const tabs = [{ title: 'events' }, { title: 'reward' }];

// 导航栏元素
const RenderTab = ({ tab, activeIndex, index }: { tab: Record<string, any>; activeIndex: number; index: number }) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View
      style={[
        styles['h-full'],
        styles['p-5'],
        styles['justify-center'],
        activeIndex === index ? styles['border-bottom-1'] : null,
        { borderColor: colors.primary },
      ]}
    >
      <Text style={[{ color: activeIndex === index ? colors.primary : colors.blurText }]}>{capitalizeEachWord(tab.title)}</Text>
    </View>
  );
};

export default function ActivityHeader() {
  const insets = useSafeAreaInsets(); // 获取安全区信息
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={[{ marginTop: insets.top, backgroundColor: colors.card }]}>
      <Segment tabs={tabs} RenderTab={RenderTab} />
    </View>
  );
}
