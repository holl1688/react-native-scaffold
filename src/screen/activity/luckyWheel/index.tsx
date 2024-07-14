import { useDispatch } from 'react-redux';
import { getLuckyWheelDetail } from '@src/store/slice/activity';
import { ParamListBase } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RewardModalComponent from './components/RewardModal';
import React, { useEffect, useState } from 'react';
import WheelComponent from './components/Wheel';
import global from '@src/common/styles';

/**
 * 幸运大转盘
 */
export default function LuckyWheelScreen({ route, navigation }: { route: any; navigation: NativeStackNavigationProp<ParamListBase> }) {
  const dispatch = useDispatch(); // 派发方法
  const { activityId } = route.params; // 活动ID
  const [rewardModalVisible, setRewardModalVisible] = useState(false); // 奖品弹窗显示状态
  const [currentPrize, setCurrentPrize] = useState<Record<string, any>>({}); // 当前奖品

  // 初始渲染执行方法: 获取幸运大转盘活动详情
  useEffect(() => {
    dispatch(getLuckyWheelDetail(activityId)); // 获取幸运大转盘活动详情
  }, [activityId, dispatch]);

  // 监听当前奖品和奖品弹窗状态变化
  useEffect(() => {
    if (currentPrize.uuid) {
      setRewardModalVisible(true); // 设置奖品弹窗显示状态为可见
    }
  }, [currentPrize, navigation]);

  return (
    <ScrollView>
      <View style={[styles['items-center'], styles['pt-20']]}>
        <WheelComponent activityId={activityId} setCurrentPrize={setCurrentPrize} />
      </View>
      <RewardModalComponent visible={rewardModalVisible} setRewardModalVisible={setRewardModalVisible} setCurrentPrize={setCurrentPrize} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...global,
});
