import { flagSvg, missSvg } from './svg';
import { flagIcons } from '@src/components/Flag/icons';
import { Image, StyleProp, View, ViewStyle, StyleSheet, DimensionValue } from 'react-native';
import React, { ReactNode, useLayoutEffect, useState } from 'react';

interface FlagProps {
  country: string;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>; // 允许传递任何视图样式<对象或数组>
}

export default function Flag({ country, width, height, style }: FlagProps) {
  const [SvgIcon, setASvgIcon] = useState<ReactNode | null>(null);
  country = country.toUpperCase();
  const flattenStyle = StyleSheet.flatten(style);

  useLayoutEffect(() => {
    const svg = flagSvg[country];
    if (flagSvg[country]) {
      setASvgIcon(svg({ width: '100%', height: '100%' }));
    }
  }, [country]);

  return missSvg.includes(country) ? (
    <View style={[{ width: width || 20, height: height || 20 }, flattenStyle]}>
      <Image source={flagIcons[country]} style={[{ width: `${'100%'}`, height: `${'100%'}` }]} />
    </View>
  ) : SvgIcon ? (
    <View style={[{ width: width || 20, height: height || 20 }, flattenStyle]}>{SvgIcon}</View>
  ) : null;
}
