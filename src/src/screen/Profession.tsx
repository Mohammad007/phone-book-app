import { View, Text, ScrollView, TextInput, Button, ToastAndroid, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/AddStyle'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import axios from 'axios'
import { ApiUrl } from '../utility/BaseUrl'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Profession = () => {
    const [name, setName] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [contacts, setContacts] = useState([]);


    const handleAdd = () => {

        if (!name) {
            // If any field is empty, show an alert
            ToastAndroid.showWithGravity(
                'Please fill name fields!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
            return; // Prevent further execution of the function
        }

        // Prepare the data object to be sent to the API
        const formData = {
            name: name
        };

        // Make a POST request to your API endpoint using Axios
        axios.post(`${ApiUrl}/professions/add`, formData)
            .then(response => {
                agentFun();
                ToastAndroid.showWithGravity(
                    'Form submitted successfully!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                setName('');
            })
            .catch(error => {
                ToastAndroid.showWithGravity(
                    'Failed to submit form. Please try again later.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                console.error('Error submitting form:', error);
            });

    };

    useEffect(() => {
        agentFun();
      }, []);
    
      const agentFun = async () => {
        try {
          setRefreshing(true); // Set refreshing to true when fetching data
    
          axios.get(`${ApiUrl}/professions/list`)
            .then(response => {    
                console.log(response.data);
                
              setContacts(response.data.professions);
    
              ToastAndroid.showWithGravity(
                'Professions list fetched successfully!',
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
          axios.delete(`${ApiUrl}/professions/${id}`)
            .then(response => {
              setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
              ToastAndroid.showWithGravity(
                'Profession Delete successfully!',
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

    const renderItem = ({ item }: { item: { id: string; name: string, phone: string } }) => (
        <View style={[styles.itemContainer, {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: responsiveWidth(2)
        }]}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <FontAwesome name="trash" size={responsiveFontSize(3.3)} color="red" />
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={{ marginTop: responsiveHeight(2) }} />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <View style={{ marginTop: responsiveHeight(2) }} />
            <Button
                title="Add"
                onPress={handleAdd}
            />
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

export default Profession