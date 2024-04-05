import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native'
import React from 'react'
import Navigation from './src/src/navigation/Navigation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation />
    </SafeAreaView>
  )
}

export default App