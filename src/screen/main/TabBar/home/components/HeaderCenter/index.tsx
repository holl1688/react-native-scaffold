import { Image } from 'react-native';
import { HeaderTitleProps } from '@react-navigation/elements';
import React from 'react';

export default function HeaderCenter({ uri }: HeaderTitleProps & { uri: string }) {
  return <Image source={{ uri }} width={60} height={30} />;
}
