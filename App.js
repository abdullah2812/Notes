import React from 'react'
import "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import MainNavigator from './src/navigator/MainNavigator'
import TryCodeScreen from './src/screens/TryCodeScreen'
import EditNoteScreen from './src/screens/EditNoteScreen'
const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigator/>
    </SafeAreaProvider>
  )
}

export default App;