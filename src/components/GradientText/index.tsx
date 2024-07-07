import MaskedView from '@react-native-masked-view/masked-view';
import { View, Text } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '@src/common/styles';
import { CustomTheme } from '@src/type/theme';
import { useTheme } from '@react-navigation/native';

const colorStyles = {
  colors: ['#FF0000', '#0000FF'],
  locations: [0, 1],
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
};

export default function GradientText({ text = '', colorStyle = colorStyles }) {
  const { colors } = useTheme() as CustomTheme;

  return (
    <MaskedView
      style={[styles['flex-row'], styles['h-40']]}
      maskElement={
        <View
          style={[
            styles.transparent,
            styles['flex-1'],
            styles['justify-center'],
            styles['items-center'],

            {
              shadowColor: colors.tinge,
              shadowOffset: {
                width: Number(0),
                height: Number(4),
              },
              shadowOpacity: Number(0.3),
              shadowRadius: Number(2),
              elevation: Number(5),
            },
          ]}
        >
          <Text style={[styles['weight-700']]}>{text}</Text>
        </View>
      }
    >
      <LinearGradient {...colorStyle} style={[styles['flex-1'], styles['h-full']]} />
    </MaskedView>
  );
}
