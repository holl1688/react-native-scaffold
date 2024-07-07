import { CustomTheme } from '@src/type/theme';
import COLORS from '../variables/default';

export const defaultTheme: CustomTheme = {
  // 自定义暗黑主题
  dark: true,
  colors: {
    tinge: COLORS.BLACK,
    primary: COLORS.GREEN700,
    background: COLORS.BLACK400,
    card: COLORS.BLACK300,
    text: COLORS.WHITE,
    border: COLORS.BLACK200,
    notification: COLORS.RED,
    blurText: COLORS.WHITE50,
    inputBackdrop: COLORS.BLACK400,
    buttonBackdrop: COLORS.GREEN800,
  },
  layout: {
    radius: 4,
  },
};
