import { View, Image } from 'react-native';
import { CustomTheme } from '@src/type/theme';
import { adaptDP } from '@src/hooks/adaptive';
import { DrawerHeaderProps, DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useTheme } from '@react-navigation/native';
import ActivityHeader from './components/ActivityHeader';
import Button from '@src/components/Button';
import React, { useEffect } from 'react';
import styles from '@src/common/styles';
import Text from '@src/components/Text';

// 顶部导航栏
const HeaderComponent = (_props: DrawerHeaderProps) => {
  return <ActivityHeader />;
};

export default function ActivityScreen({ navigation }: { navigation: DrawerNavigationProp<ParamListBase> }) {
  const { colors, layout } = useTheme() as CustomTheme;

  useEffect(() => {
    navigation.setOptions({
      header: props => HeaderComponent(props),
    });
  }, [navigation]);

  return (
    <View style={[styles['flex-1'], styles['p-10']]}>
      <View style={[{ borderRadius: layout.radius, backgroundColor: colors.tinge }]}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwcEVOZkmxYtzI5wAAi1cZiWwRUJFOAdNvTQ&s' }}
          width={adaptDP(370)}
          height={adaptDP(120)}
        />
        <View style={[styles['flex-row'], styles['justify-between'], styles['items-center'], styles['p-20']]}>
          <Text style={[{ color: colors.blurText }]}>{'Lucky Spin'}</Text>
          <Button
            title="In Progress"
            style={[styles['h-40'], { backgroundColor: colors.card }]}
            textStyle={[{ color: colors.primary }]}
            onPress={() => navigation.navigate('LuckyWheel', { activityId: 1 })}
          />
        </View>
      </View>
    </View>
  );
}
