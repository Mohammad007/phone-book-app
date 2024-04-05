import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import Drawers from './Drawer';
import { storage } from '../utility/localStorage';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const user = storage.getString('user')
      setUser(user)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) {
    return null; // or render a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "HomeScreen" : "LoginScreen"}>
        <Stack.Screen name="HomeScreen" component={Drawers} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation