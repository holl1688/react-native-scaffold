import { ThemeContext } from '@src/theme';
import { useNavigator } from '@src/router';
import { CustomTheme } from '@src/type/theme';
import { defaultTheme } from '@src/theme/modules/default';
import { StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LuckyWheelScreen from '@src/screen/activity/luckyWheel';
import ModalProvider from '@src/components/ModalProvider';
import LaunchScreen from '@src/screen/system/launch';
import React, { useRef, useState } from 'react';
import SvgRecord from '@res/svg/record.svg';
import MainScreen from '@src/screen/main';
import styles from '@src/common/styles';
import './src/i18n';

// 创建栈导航组件
const Stack = createNativeStackNavigator();

// 活动页头部导航栏右侧按钮
const ActivityHeaderRight = () => {
  const navigator = useNavigator(); // 获取导航方法

  return (
    <TouchableOpacity style={[styles['px-10']]} onPress={() => navigator('Launch')}>
      <SvgRecord width={17} height={21} />
    </TouchableOpacity>
  );
};

/**
 * App入口
 */
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<CustomTheme | Theme>(defaultTheme);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  /**
   * 切换主题方法(在路由标签组件中绑定)
   */
  const toggleTheme = (newTheme: CustomTheme | Theme) => {
    setTheme(newTheme);
  };

  // 导航状体变化监听
  const onNavigationChange = () => {
    const currentRoute = navigationRef.current?.getCurrentRoute(); // 使用 navigationRef 获取当前路由状态
    const rootState = navigationRef.current?.getRootState(); // 或者获取完整的路由状态树
    console.info('currentRoute:', currentRoute);
    console.info('rootState:', rootState);
  };

  return (
    <ThemeContext.Provider value={toggleTheme}>
      <NavigationContainer ref={navigationRef} theme={theme} onStateChange={onNavigationChange}>
        <ModalProvider>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <Stack.Navigator
            id="RootNavigator"
            initialRouteName="Launch" // 默认路由
            // 全局配置
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.card, // 头部背景色
              },
              headerTintColor: theme.colors.text, // 头部文字颜色
              headerTitleStyle: { fontWeight: 'bold' }, // 头部文字样式
            }}
          >
            <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="LuckyWheel"
              component={LuckyWheelScreen}
              options={{ headerTitleAlign: 'center', headerBackTitleVisible: false, headerRight: ActivityHeaderRight }}
            />
          </Stack.Navigator>
        </ModalProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
