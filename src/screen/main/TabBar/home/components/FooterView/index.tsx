import { Text, View } from 'react-native';
import { CustomTheme } from '@src/type/theme';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import SvgBgTelegram from '@res/default/svg/telegram.svg';
import SvgInstagram from '@res/default/svg/social/Instagram.svg';
import SvgFacebook from '@res/default/svg/social/Facebook.svg';
import SvgTelegram from '@res/default/svg/social/Telegram.svg';
import SvgWhatsApp from '@res/default/svg/social/WhatsApp.svg';
import SvgTwitter from '@res/default/svg/social/Twitter.svg';
import SvgTiTok from '@res/default/svg/social/TikTok.svg';
import styles from '@src/common/styles';
import React from 'react';

export default function FooterView() {
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={[styles['items-center'], styles['py-20']]}>
      <SvgBgTelegram style={[styles.absolute, styles['top-0'], styles['left-0']]} color="rgba(255, 255, 255, 0.02)" />
      <Text style={[styles['text-20'], styles['weight-700'], { color: colors.text }]}>{t('SocialMedia')}</Text>
      <Text style={[styles['py-20'], { color: colors.blurText }]}>{t('SocialMediaTip')}</Text>
      <View style={[styles['flex-row'], styles['w-full'], styles['justify-around']]}>
        <SvgInstagram />
        <SvgFacebook />
        <SvgTelegram />
        <SvgWhatsApp />
        <SvgTwitter />
        <SvgTiTok />
      </View>
    </View>
  );
}
