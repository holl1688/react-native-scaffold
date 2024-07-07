import { View, Button } from 'react-native';
import { useModal } from '@src/components/ModalProvider';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Dialog from '@src/components/Dialog';
import React from 'react';

export default function PersonalScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }) {
  const { showModal } = useModal();

  return (
    <View style={{ flex: Number(1), alignItems: `${'center'}`, justifyContent: `${'center'}` }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Button onPress={() => showModal(<Dialog />, { backdropDismiss: true })} title="Logout" />
    </View>
  );
}
