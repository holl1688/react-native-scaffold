/**
 * 首字母大写
 * @param text 输入文本
 */
export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * 每个单词首字母大写
 * @param text 输入文本
 */
export const capitalizeEachWord = (text: string) =>
  text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 */
export const generateRandom = (min?: number, max?: number) => {
  if (max === undefined) {
    if (min === undefined) {
      min = 0;
      max = 10;
    } else {
      max = min;
      min = 0;
    }
  } else if (min === undefined) {
    min = 0;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
