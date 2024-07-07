import { logo } from '@src/common/mock';
import { CustomTheme } from '@src/type/theme';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, View, Text, TouchableHighlight, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SvgSupport from '@res/default/svg/support.svg';
import DrawerButton from './components/DrawerButton';
import HeaderCenter from './components/HeaderCenter';
import SvgToTop from '@res/default/svg/to-top.svg';
import HeaderRight from './components/HeaderRight';
import PopularView from './components/PopularView';
import FooterView from './components/FooterView';
import SortTabBar from './components/SortTabBar';
import SwipeView from './components/SwipeView';
import Marquee from './components/Marquee';
import Banner from './components/Banner';
import styles from '@src/common/styles';

// 导航栏右侧组件
const HeaderRightComponent = ({ props, navigation }: { props: any; navigation: DrawerNavigationProp<ParamListBase> }) => (
  <HeaderRight {...props} navigation={navigation} />
);

/**
 * 含抽屉主页
 * @param 默认路由传参
 */
export default function HomeScreen({ navigation }: { navigation: DrawerNavigationProp<ParamListBase> }) {
  const theme = useTheme() as CustomTheme;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { bottom } = useSafeAreaInsets(); // 获取安全区信息
  const [showToTop, setShowToTop] = useState(false); // 是否显示返回顶部按钮

  useEffect(() => {
    navigation.setOptions({
      headerLeft: props => DrawerButton({ ...props, navigation, theme }),
      headerTitle: props => HeaderCenter({ ...props, uri: logo }),
      headerRight: props => HeaderRightComponent({ props, navigation }),
    });
  }, [navigation, theme]);

  // 滚动处理
  const scrollHandle = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (nativeEvent.contentOffset.y > 200) {
      setShowToTop(true);
    } else {
      setShowToTop(false);
    }
  };

  return (
    <View style={[styles['flex-1']]}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={scrollHandle}
        scrollEventThrottle={200}
        style={[styles['flex-1']]}
        contentContainerStyle={[{ paddingBottom: bottom + 130 }]}
      >
        <SwipeView />
        <Banner />
        <Marquee />
        <SortTabBar />
        <PopularView />
        <FooterView />
      </ScrollView>
      {/* 回到首页 */}
      {showToTop ? (
        <TouchableHighlight onPress={() => scrollViewRef.current?.scrollTo()}>
          <View
            style={[
              styles.absolute,
              styles['right-20'],
              styles['py-5'],
              styles['px-10'],
              styles['items-center'],
              { bottom: bottom + 80, backgroundColor: theme.colors.card, borderRadius: theme.layout.radius },
            ]}
          >
            <SvgToTop width={20} height={20} color={theme.colors.primary} />
            <Text style={[styles['-top-5'], { color: theme.colors.text }]}>TOP</Text>
          </View>
        </TouchableHighlight>
      ) : null}
      {/* 客服 */}
      <TouchableHighlight>
        <View
          style={[
            styles.absolute,
            styles['p-10'],
            styles['left-20'],
            styles['rounded-30'],
            styles['items-center'],
            { bottom: bottom + 80, backgroundColor: theme.colors.primary },
          ]}
        >
          <SvgSupport width={30} height={30} />
        </View>
      </TouchableHighlight>
    </View>
  );
}
