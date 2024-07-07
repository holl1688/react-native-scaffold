import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-react-native-language-detector';

import en_US from './locales/en.json'; // 英文语言包
import zh_CN from './locales/zh.json'; // 中文语言包

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': {
        translation: en_US,
      },
      'zh-CN': {
        translation: zh_CN,
      },
    },
    lng: 'en-US', // 默认语言
    fallbackLng: 'en-US', // 当当前语言没有翻译时使用的备选语言
    interpolation: {
      escapeValue: false, // 不需要对结果进行转义
    },
  });

export const t = i18n.t.bind(i18n);

export const changeLanguage = i18n.changeLanguage.bind(i18n);

export default i18n;
