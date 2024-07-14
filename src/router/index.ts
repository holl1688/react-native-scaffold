import { useModal } from '@src/components/ModalProvider';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import LuckyWheelScreen from '@src/screen/activity/luckyWheel';
import ActivityScreen from '@src/screen/main/TabBar/activity';
import PersonalScreen from '@src/screen/main/TabBar/personal';
import WithdrawScreen from '@src/screen/main/TabBar/withdraw';
import LoginModal from '@src/components/AccountOperational';
import DepositScreen from '@src/screen/main/TabBar/deposit';
import HomeScreen from '@src/screen/main/TabBar/home';
import LaunchScreen from '@src/screen/system/launch';
import MainScreen from '@src/screen/main';
import useStore from '@src/store';

// 路由配置列表: 用于配置路由名称、组件、是否需要登录等信息
export const routes = {
  launch: { name: 'Launch', screen: LaunchScreen, auth: false },
  main: {
    name: 'Main',
    component: MainScreen,
    auth: false,
    routes: {
      home: { name: 'Home', screen: HomeScreen, auth: false },
      activity: { name: 'Details', screen: ActivityScreen, auth: true },
      deposit: { name: 'CreatePost', screen: DepositScreen, auth: true },
      withdraw: { name: 'Supports', screen: WithdrawScreen, auth: true },
      personal: { name: 'Profile', screen: PersonalScreen, auth: true },
    },
  },
  luckyWheel: { name: 'LuckyWheel', screen: LuckyWheelScreen, auth: true },
};

/**
 * 导航钩子: React函数组件中调用可使用useNavigation, useContext等Hook
 */
export const useNavigator = () => {
  const { showModal } = useModal(); // 打开模态框方法
  const loginModal = LoginModal({ type: 'login' }); // 登录弹窗(必需初始化时赋值)
  const navigation = useNavigation<NavigationProp<ParamListBase>>(); // 导航实例
  const store = useStore.getState(); // 获取store状态

  function navigate(screenName: string, params?: Record<string, any>) {
    type RouteNames = keyof typeof routes; // 路由名称类型
    const token = store.app.token; // 用户token
    let auth: boolean = false; // 定义路由是否需要登录状态
    for (let route in routes) {
      if (routes[route as RouteNames].name === screenName) {
        auth = routes[route as RouteNames].auth; // 获取跳转路由是否需要登录
      }
    }
    if (auth && !token) {
      return showModal(loginModal); // 如果跳转路由需要登录且用户未登录, 打开登录弹窗
    }
    navigation.navigate(screenName, params); // 如果用户已登录，进行页面跳转
  }
  return navigate;
};
