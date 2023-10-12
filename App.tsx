/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Layout from './src/components/layout';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <NativeBaseProvider isSSR>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Layout />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

export default App;
