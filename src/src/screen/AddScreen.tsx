import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, ToastAndroid } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RNPickerSelect from 'react-native-picker-select';
import stateDistt from '../utility/stateDistrict.json'
import { pickerSelectStyles, styles } from '../styles/AddStyle';
import axios from 'axios';
import { ApiUrl } from '../utility/BaseUrl';

const AddScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleAdd = () => {

    if (!name || !profession || !phone || !selectedState || !district || !address) {
      // If any field is empty, show an alert
      ToastAndroid.showWithGravity(
        'Please fill in all fields!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return; // Prevent further execution of the function
    }

    // Prepare the data object to be sent to the API
    const formData = {
      name: name,
      profession: profession,
      mobile: phone,
      state: selectedState,
      district: district,
      address: address
    };

    // Make a POST request to your API endpoint using Axios
    axios.post(`${ApiUrl}/contacts/add`, formData)
      .then(response => {
        ToastAndroid.showWithGravity(
          'Form submitted successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        setName('');
        setProfession('');
        setPhone('');
        setSelectedState('');
        setDistrict('');
        setAddress('');
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
      axios.get(`${ApiUrl}/professions/list`)
        .then(response => {    
          setContacts(response.data.professions);
        })
        .catch(error => {
          console.error('Error fetching agent list:', error);
        })
    } catch (error) {
      console.log('Error fetching agent list:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: responsiveHeight(2) }} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <View style={pickerSelectStyles.inputAndroid}>
        <RNPickerSelect
          placeholder={{ label: 'Select Profession', value: null }}
          items={contacts.map((item, index) => (
            { label: item?.name, value: item?.name }
          ))}
          onValueChange={(value) => setProfession(value)}
          value={profession}
        />
      </View>
      <View style={pickerSelectStyles.inputAndroid}>
        <RNPickerSelect
          placeholder={{ label: 'Select State', value: null }}
          items={stateDistt.states.map((item, index) => (
            { label: item.state, value: item.state }
          ))}
          onValueChange={(value) => setSelectedState(value)}
          value={selectedState}
        />
      </View>
      <View style={pickerSelectStyles.inputAndroid}>
        <RNPickerSelect
          placeholder={{ label: 'Select District', value: null }}
          items={stateDistt.states
            .filter(item => item.state === selectedState)
            .map(item => item.districts.map(disItem => ({ label: disItem, value: disItem })))
            .flat()} // Flatten the array
          onValueChange={value => setDistrict(value)}
          value={district}
        />
      </View>
      <TextInput
        style={[styles.input, styles.addressInput]}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <View style={{ marginTop: responsiveHeight(2) }} />
      <Button
        title="Add"
        onPress={handleAdd}
      />
    </ScrollView>
  );
};


export default AddScreen;
