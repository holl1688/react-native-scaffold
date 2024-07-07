import 'intl-pluralrules';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import React from 'react';
import App from './App';

const ReduxApp = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
