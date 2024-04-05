import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/LoginStyle';
import { storage } from '../utility/localStorage';
import axios from 'axios';
import { ApiUrl } from '../utility/BaseUrl';

const LoginScreen: React.FC  = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        return ToastAndroid.showWithGravity(
          'Username and Password are required!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }

      const response = await axios.post(`${ApiUrl}/agent/login`, {
        username: username.toLowerCase(),
        password: password
      });

      if(response.data){
        storage.set('user', JSON.stringify(response.data.agent))
        // Navigate to the HomeScreen upon successful login
        navigation.navigate('HomeScreen');
      }
      
    } catch (error) {
      ToastAndroid.showWithGravity('username & password not matched!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY OFFICE</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <FontAwesome
            name={hidePassword ? 'eye-slash' : 'eye'}
            size={24}
            color="gray"
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
