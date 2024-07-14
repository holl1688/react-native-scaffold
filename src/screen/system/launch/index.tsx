import { View } from 'react-native';
import { CommonActions, NavigationProp, ParamListBase } from '@react-navigation/native';
import Button from '@src/components/Button';
import styles from '@src/common/styles';
import Text from '@src/components/Text';
import React from 'react';

export default function LaunchScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }) {
  const navigateToHome = () => {
    const navigateAction = CommonActions.navigate({
      name: 'Main',
    });

    navigation.dispatch(navigateAction);
  };

  return (
    <View style={[styles['flex-1'], styles['items-center'], styles['justify-center']]}>
      <Text style={[styles['text-40']]}>WelCome</Text>
      <Button onPress={navigateToHome}>
        <Text style={[styles['text-20']]}>Start</Text>
      </Button>
    </View>
  );
}
