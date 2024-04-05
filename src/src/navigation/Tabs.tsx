import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactScreen from '../screen/ContactScreen';
import AddScreen from '../screen/AddScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity, View } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs: React.FC = ({ navigation }: any) => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle: { height: responsiveHeight(7) },
        headerRight: () => (
            <TouchableOpacity style={{ marginRight: responsiveWidth(4), padding: responsiveWidth(2) }} onPress={() => navigation.navigate("LoginScreen")}>
              <MaterialIcons name="logout" color={'black'} size={responsiveFontSize(3.5)} />
            </TouchableOpacity>
        )
    }}>
      <Tab.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="address-book" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
          ),
          headerTitle: 'All Contact'
        }}
      />
      <Tab.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-plus" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
          ),
          headerTitle: 'Add Contact'
        }}
      />
    </Tab.Navigator>

  )
}

export default Tabs