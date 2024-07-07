import { AnimatableNumericValue } from 'react-native';

export type CustomTheme = {
  dark: boolean;
  colors: {
    tinge: string;
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    blurText: string;
    inputBackdrop: string;
    buttonBackdrop: string;
  };
  layout: {
    radius: AnimatableNumericValue;
  };
};
