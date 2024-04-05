import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ContactScreen from '../screen/ContactScreen';
import AddScreen from '../screen/AddScreen';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native';
import AgentScreen from '../screen/AgentScreen';
import AddagentScreen from '../screen/AddagentScreen';
import Profession from '../screen/Profession';
import { storage } from '../utility/localStorage';

const Drawer = createDrawerNavigator();

export default function Drawers({ navigation }: any) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const user = storage.getString('user')
            setUser(JSON.parse(user))
            setIsLoading(false)
        })()
    }, [])

    if (isLoading) {
        return null; // or render a loading spinner
    }

    const logout = async () => {
        try {
            storage.clearAll()
            navigation.navigate("LoginScreen")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        user.role == 'admin' ? (
            <Drawer.Navigator initialRouteName={'Home'} screenOptions={{
                headerRight: () => (
                    <TouchableOpacity style={{ marginRight: responsiveWidth(4), padding: responsiveWidth(2) }} onPress={logout}>
                        <MaterialIcons name="logout" color={'black'} size={responsiveFontSize(3.5)} />
                    </TouchableOpacity>
                )
            }}>
                <Drawer.Screen
                    name="ContactScreen"
                    component={ContactScreen}
                    options={{
                        drawerLabel: 'Contacts',
                        drawerIcon: ({ focused, color, size }) => (
                            <FontAwesome name="address-book" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
                        ),
                        headerTitle: "My Office",
                    }}
                />
                <Drawer.Screen
                    name="AddScreen"
                    component={AddScreen}
                    options={{
                        drawerLabel: 'Add Contact',
                        drawerIcon: ({ focused, color, size }) => (
                            <FontAwesome name="user-plus" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
                        ),
                        headerTitle: 'Add Contact',
                    }}
                />
                <Drawer.Screen
                    name="Profession"
                    component={Profession}
                    options={{
                        drawerLabel: 'Profession',
                        drawerIcon: ({ focused, color, size }) => (
                            <FontAwesome name="file" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
                        ),
                        headerTitle: 'Profession',
                    }}
                />
                <Drawer.Screen
                    name="Agents"
                    component={AgentScreen}
                    options={{
                        drawerLabel: 'Agents',
                        drawerIcon: ({ focused, color, size }) => (
                            <FontAwesome name="users" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
                        ),
                        headerTitle: 'Agents',
                    }}
                />
                <Drawer.Screen
                    name="Add Agents"
                    component={AddagentScreen}
                    options={{
                        drawerLabel: 'Add Agent',
                        drawerIcon: ({ focused, color, size }) => (
                            <FontAwesome name="user-plus" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
                        ),
                        headerTitle: 'Add Agent',
                    }}
                />
            </Drawer.Navigator>
        ) : (
            <Drawer.Navigator initialRouteName={'AddScreen'} screenOptions={{
                headerRight: () => (
                    <TouchableOpacity style={{ marginRight: responsiveWidth(4), padding: responsiveWidth(2) }} onPress={logout}>
                        <MaterialIcons name="logout" color={'black'} size={responsiveFontSize(3.5)} />
                    </TouchableOpacity>
                )
            }}>
                <Drawer.Screen
                    name="AddScreen"
                    component={AddScreen}
                    options={{
                        drawerLabel: 'Add Contact',
                        drawerIcon: ({ focused, color, size }) => (
                            <FontAwesome name="user-plus" color={color} size={size} style={{ marginTop: responsiveHeight(1) }} />
                        ),
                        headerTitle: 'Add Contact',
                    }}
                />
            </Drawer.Navigator>
        )
    );
}