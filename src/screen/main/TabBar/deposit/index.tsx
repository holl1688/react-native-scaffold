import { View, Button } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';

export default function DepositScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }) {
  return (
    <View style={{ flex: Number(1), alignItems: `${'center'}`, justifyContent: `${'center'}` }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
