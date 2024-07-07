import { adaptDP } from '@src/hooks/adaptive';
import { CustomTheme } from '@src/type/theme';
import { ParamListBase } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import SvgMenu from '@res/default/svg/menu.svg';
import global from '@src/common/styles';
import React from 'react';

/**
 * 自定义导航栏抽屉按钮
 * @param param 路由实例
 */
export default function DrawerButton({ navigation, theme }: { navigation: DrawerNavigationProp<ParamListBase>; theme: CustomTheme }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={[styles['h-full'], styles['justify-center'], styles['items-center'], { width: adaptDP(44), backgroundColor: theme.colors.border }]}
    >
      <SvgMenu color="#fff" width={20} height={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ...global,
});
