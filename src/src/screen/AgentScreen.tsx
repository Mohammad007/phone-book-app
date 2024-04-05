import { View, Text, ScrollView, FlatList, TouchableOpacity, ToastAndroid, RefreshControl, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../styles/AddStyle'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { ApiUrl } from '../utility/BaseUrl'

const AgentScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotateIcon = () => {
    const toValue = expanded ? 1 : 0;
    Animated.timing(rotateValue, {
      toValue: toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const toggleAccordion = (id: string) => {
    setExpanded(expanded === id ? null : id);
    rotateIcon();
  };

  useEffect(() => {
    agentFun();
  }, []);

  const agentFun = async () => {
    try {
      setRefreshing(true); // Set refreshing to true when fetching data

      axios.get(`${ApiUrl}/agent/list`)
        .then(response => {    
          setContacts(response.data.agents);

          ToastAndroid.showWithGravity(
            'Agent list fetched successfully!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        })
        .catch(error => {
          ToastAndroid.showWithGravity(
            'Failed to get API. Please try again later.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          console.error('Error fetching agent list:', error);
        })
        .finally(() => setRefreshing(false)); // Set refreshing to false when data fetching completes
    } catch (error) {
      console.log('Error fetching agent list:', error);
    }
  };

  const handleDelete = (id: any) => {
    try {
      axios.delete(`${ApiUrl}/agent/${id}`)
        .then(response => {
          setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
          ToastAndroid.showWithGravity(
            'Agent Delete successfully!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        })
        .catch(error => {
          ToastAndroid.showWithGravity(
            'Failed to get API. Please try again later.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          console.error('Error fetching agent list:', error);
        })
    } catch (error) {
      console.log('Error fetching agent list:', error);
    }
  };

  const renderItem = ({ item }: { item: { id: string; name: string, mobile: string,  username: string, address: string, fname: string, password: string, created_at: string } }) => (
    <View>
      <TouchableOpacity onPress={() => toggleAccordion(item.id)}>
        <View style={[styles.itemContainer, {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: responsiveWidth(2)
        }]}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.mobile}</Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <FontAwesome name="trash" size={responsiveFontSize(3.3)} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {expanded === item.id && (
        <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Father Name:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.fname}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Username:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.username}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Password:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.password}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Address:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.address}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Added Date:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.created_at}</Text>
        </View>
      </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginTop: responsiveHeight(2) }} />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={agentFun}
          />
        }
      />
    </View>
  )
}

export default AgentScreen