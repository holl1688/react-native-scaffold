import { View, Text, Button } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';

/**
 * 抽屉内容组件
 * @param param 默认路由传参
 */
export default function DrawerScreen({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {/* 自定义内容 */}
      <Text>这是自定义的侧边栏内容</Text>
      {/* 例如，添加一个按钮来关闭侧边栏 */}
      <Button title="关闭侧边栏" onPress={() => navigation.closeDrawer()} />
    </View>
  );
}
