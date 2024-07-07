import { useSelector } from 'react-redux';
import { changeLanguage } from '@src/i18n';
import { CustomTheme } from '@src/type/theme';
import { selectToken } from '@src/store/slice/app';
import { useModal } from '@src/components/ModalProvider';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useTheme } from '@react-navigation/native';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import Popover, { togglePopup } from '@src/components/Popover';
import LoginModal from '@src/components/AccountOperational';
import SvgPig from '@res/default/svg/pig.svg';
import Button from '@src/components/Button';
import SvgEarth from './assets/earth.svg';
import styles from '@src/common/styles';
import Flag from '@src/components/Flag';
import React from 'react';
import { useTranslation } from 'react-i18next';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    country: 'US',
    language: 'English',
    locale: 'en-US',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    country: 'CN',
    language: '简体中文',
    locale: 'zh-CN',
  },
];

// 语言选项
const LanguageItem: React.FC<{ country: string; language: string; locale: string }> = ({ country, language, locale }) => {
  const { colors } = useTheme() as CustomTheme;
  const onSelect = () => {
    changeLanguage(locale, err => {
      if (err) {
        console.error(err);
      } else {
        togglePopup();
      }
    });
  };

  return (
    <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} style={[styles['py-10'], styles['px-20']]} onPress={onSelect}>
      <View style={[styles['flex-row'], styles['items-center']]}>
        <Flag style={[styles['rounded-30'], styles.hidden]} country={country} width={20} height={20} />
        <Text style={[styles['ml-15'], { color: colors.text }]}>{language}</Text>
      </View>
    </TouchableHighlight>
  );
};

// 弹框内容
const PopoverComponent = () => {
  const { colors, layout } = useTheme() as CustomTheme;

  return (
    <FlatList
      style={[styles['mt-10'], { backgroundColor: colors.card, borderRadius: layout.radius }]}
      data={DATA}
      renderItem={({ item }) => <LanguageItem country={item.country} language={item.language} locale={item.locale} />}
      keyExtractor={item => item.id}
    />
  );
};

export default function HeaderRight({ navigation }: { navigation: DrawerNavigationProp<ParamListBase> }) {
  const token = useSelector(selectToken);
  const { t } = useTranslation();
  const { colors, layout } = useTheme() as CustomTheme;
  const { showModal } = useModal();
  /**
   * 登录弹窗
   */
  const loginHandle = () => {
    showModal(<LoginModal />, { backdropDismiss: true });
  };

  /**
   * 注册弹窗
   */
  const registerHandle = () => {
    showModal(<LoginModal type={'register'} />, { backdropDismiss: true });
  };

  /**
   * 跳转充值页面
   */
  const depositHandle = () => {
    navigation.navigate('Deposit');
  };

  return (
    <View style={[styles['flex-row'], styles['items-center'], styles['pr-10']]}>
      {token ? (
        <View
          style={[
            styles['flex-row'],
            styles['items-center'],
            styles['py-3'],
            styles['pr-3'],
            styles['pl-10'],
            styles['mr-10'],
            { backgroundColor: colors.background, borderRadius: layout.radius },
          ]}
        >
          <Text style={[styles['text-12'], { color: colors.notification }]}>R$</Text>
          <Text style={[styles['text-12'], styles['mx-3'], { color: colors.text }]}>0.00</Text>
          <Button style={[styles['h-auto'], styles['px-5'], styles['py-3']]} onPress={depositHandle} suffix={<SvgPig width={20} height={20} />} />
        </View>
      ) : (
        <>
          <Button title={t('Login')} onPress={loginHandle} style={[styles['h-30'], { backgroundColor: colors.border }]} />
          <View style={[styles['mx-10']]}>
            <Button title={t('Register')} onPress={registerHandle} style={[styles['h-30']]} />
          </View>
        </>
      )}
      <Popover popover={PopoverComponent()}>
        <SvgEarth width={24} height={24} />
      </Popover>
    </View>
  );
}
