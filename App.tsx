import { ThemeContext } from '@src/theme';
import { CustomTheme } from '@src/type/theme';
import { defaultTheme } from '@src/theme/modules/default';
import { StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LuckyWheelScreen from '@src/screen/activity/luckyWheel';
import ModalProvider from '@src/components/ModalProvider';
import SvgRecord from '@res/svg/record.svg';
import MainScreen from '@src/screen/main';
import React, { useState } from 'react';
import styles from '@src/common/styles';
import './src/i18n';

// 创建栈导航组件
const Stack = createNativeStackNavigator();

// 活动页头部导航栏右侧按钮
const activityHeaderRight = () => {
  return (
    <TouchableOpacity style={[styles['px-10']]}>
      <SvgRecord width={17} height={21} />
    </TouchableOpacity>
  );
};

/**
 * App入口
 */
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<CustomTheme | Theme>(defaultTheme);

  /**
   * 切换主题方法(在路由标签组件中绑定)
   */
  const toggleTheme = (newTheme: CustomTheme | Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={toggleTheme}>
      <NavigationContainer theme={theme}>
        <ModalProvider>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <Stack.Navigator
            id="RootNavigator"
            initialRouteName="Main" // 默认路由
            // 全局配置
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.card, // 头部背景色
              },
              headerTintColor: theme.colors.text, // 头部文字颜色
              headerTitleStyle: { fontWeight: 'bold' }, // 头部文字样式
            }}
          >
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="LuckyWheel"
              component={LuckyWheelScreen}
              options={{ headerTitleAlign: 'center', headerBackTitleVisible: false, headerRight: activityHeaderRight }}
            />
          </Stack.Navigator>
        </ModalProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
