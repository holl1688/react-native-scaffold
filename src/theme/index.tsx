import { Theme } from '@react-navigation/native';
import { CustomTheme } from '@src/type/theme';
import { createContext } from 'react';

export const ThemeContext = createContext((_theme: CustomTheme | Theme) => {});
