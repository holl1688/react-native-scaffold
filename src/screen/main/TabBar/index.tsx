import { CustomTheme } from '@src/type/theme';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SvgTabWithdrawOn from '@res/default/svg/tabBar/withdraw-on.svg';
import SvgTabProfileOn from '@res/default/svg/tabBar/profile-on.svg';
import SvgTabWithdraw from '@res/default/svg/tabBar/withdraw.svg';
import SvgTabPromoOn from '@res/default/svg/tabBar/promo-on.svg';
import SvgTabProfile from '@res/default/svg/tabBar/profile.svg';
import SvgTabHomeOn from '@res/default/svg/tabBar/home-on.svg';
import SvgTabPromo from '@res/default/svg/tabBar/promo.svg';
import LinearGradient from 'react-native-linear-gradient';
import SvgTabHome from '@res/default/svg/tabBar/home.svg';
import SvgTabBg from '@res/default/svg/tabBar/bg.svg';
import TabBarIcon from './components/TabBarIcon';
import SvgPig from '@res/default/svg/pig.svg';
import WithdrawScreen from './withdraw';
import ActivityScreen from './activity';
import PersonalScreen from './personal';
import global from '@src/common/styles';
import DepositScreen from './deposit';
import HomeScreen from './home';
import React from 'react';

const Tab = createBottomTabNavigator();

// 自定义中间按钮组件
const TabBarMiddleButton = ({ onPress }: BottomTabBarButtonProps) => {
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();

  return (
    <TouchableOpacity activeOpacity={1} style={[{ width: `${'18%'}`, paddingLeft: Number(3) }]} onPress={onPress}>
      <LinearGradient
        style={[
          styles['justify-center'],
          styles['items-center'],
          styles['rounded-30'],
          styles['py-5'],
          { borderColor: `${'#a4f383'}`, borderWidth: Number(1), top: Number(-12) },
        ]}
        colors={['#8fe759', '#328624', '#25651a']}
        locations={[0.066, 0.7721, 0.9271]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SvgPig width={18} height={18} />
        <Text style={[{ fontSize: Number(10), color: colors.text }]}>{t('Deposit')}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// 自定义TabBar背景
const TabBarBg = () => {
  const insets = useSafeAreaInsets(); // 获取安全区信息
  return (
    <View style={[styles['h-full'], styles.transparent]}>
      <SvgTabBg width="100%" height="50" />
      <View style={[{ backgroundColor: `${'#21252d'}`, height: insets.bottom }]} />
    </View>
  );
};

/**
 * 主页tabBar页
 */
export default function TabBarScreen() {
  const insets = useSafeAreaInsets(); // 获取安全区信息
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      id="RootNavigator"
      screenOptions={{
        tabBarActiveTintColor: colors.text, // 选中的标签的颜色
        tabBarInactiveTintColor: colors.blurText, // 未选中的标签的颜色
        tabBarLabelStyle: { fontSize: 12 }, // 标签文本的大小
        tabBarStyle: {
          height: 50 + insets.bottom,
          paddingBottom: insets.bottom, // 底部安全区
          backgroundColor: 'transparent', // 设置背景颜色和透明度
          position: 'absolute', // 设置定位为绝对，使内容可见
          borderTopWidth: 0, // 可选，去掉顶部边框线
          elevation: 0, // 可选，去掉安卓上的阴影
        },
        tabBarBackground: () => TabBarBg(), // 自定义底部导航栏背景
      }}
    >
      <Tab.Screen
        name="Home"
        initialParams={{ itemId: 42 }}
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left', // 头部标题居中
          tabBarIcon: TabBarIcon(SvgTabHome, SvgTabHomeOn), // 底部导航标签图标
          tabBarLabel: t('Home'), // 底部导航标签文本
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: TabBarIcon(SvgTabPromo, SvgTabPromoOn), // 底部导航标签图标
          tabBarLabel: t('Promo'), // 底部导航标签文本
        }}
      />
      <Tab.Screen
        name="Deposit"
        component={DepositScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarButton: props => TabBarMiddleButton(props), // 自定义中间按钮
        }}
      />
      <Tab.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: TabBarIcon(SvgTabWithdraw, SvgTabWithdrawOn), // 底部导航标签图标
          tabBarLabel: t('Withdraw'), // 底部导航标签文本
        }}
      />
      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: TabBarIcon(SvgTabProfile, SvgTabProfileOn), // 底部导航标签图标
          tabBarLabel: t('Profile'), // 底部导航标签文本
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  ...global,
});
