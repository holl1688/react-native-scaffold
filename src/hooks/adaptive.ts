import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width; // 获取设备的宽度

const designWidth = 390; // 设计稿的宽度

/**
 * 适配设计稿尺寸
 * @param value 设计稿上的尺寸
 */
export const adaptDP = (value: number) => {
  return (value * deviceWidth) / designWidth;
};
