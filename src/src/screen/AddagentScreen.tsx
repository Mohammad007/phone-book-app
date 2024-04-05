import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, ToastAndroid } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RNPickerSelect from 'react-native-picker-select';
import stateDistt from '../utility/stateDistrict.json'
import { pickerSelectStyles, styles } from '../styles/AddStyle';
import axios from 'axios';
import { ApiUrl } from '../utility/BaseUrl';

const AddagentScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = () => {

    if (!name || !fname || !phone || !address || !username || !password) {
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
      username: username.toLowerCase(),
      password: password,
      fname: fname,
      mobile: phone,
      address: address
    };

    // Make a POST request to your API endpoint using Axios
    axios.post(`${ApiUrl}/agent/add`, formData)
      .then(response => {
        ToastAndroid.showWithGravity(
          'Form submitted successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        setName('');
        setUsername('')
        setPassword('')
        setFname('');
        setPhone('');
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
      placeholder="Username"
      value={username.toLowerCase()}
      onChangeText={setUsername}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
    />
    <TextInput
      style={styles.input}
      placeholder="Father Name"
      value={fname}
      onChangeText={setFname}
    />
    <TextInput
      style={styles.input}
      placeholder="Phone"
      value={phone}
      onChangeText={setPhone}
      keyboardType="phone-pad"
      maxLength={10}
    />
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
  )
}

export default AddagentScreen