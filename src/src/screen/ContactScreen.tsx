import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, RefreshControl, Animated, Easing } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RNPickerSelect from 'react-native-picker-select';
import stateDistt from '../utility/stateDistrict.json'
import { pickerSelectStyles } from '../styles/AddStyle';
import { handleDownloadExcel, handleDownloadPDF } from '../utility/function';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { ApiUrl } from '../utility/BaseUrl';



const ContactScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [district, setDistrict] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
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


  // Select start date
  const handleStartDateChange = (event: any, selectedDate: any) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      const start = new Date(selectedDate);
      const end = endDate;

      axios.get(`${ApiUrl}/contacts/list`)
        .then(response => {
          const filteredUsers = response.data.contact.filter((user: any) => {
            const userCreatedAt = new Date(user.created_at);
            return userCreatedAt >= start && userCreatedAt <= end;
          });

          setFilteredData(filteredUsers);
          setStartDate(selectedDate);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    }
  };

  // Select end date
  const handleEndDateChange = (event: any, selectedDate: any) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      const start = startDate;
      const end = new Date(selectedDate);

      axios.get(`${ApiUrl}/contacts/list`)
        .then(response => {
          const filteredUsers = response.data.contact.filter((user: any) => {
            const userCreatedAt = new Date(user.created_at);
            return userCreatedAt >= start && userCreatedAt <= end;
          });

          setFilteredData(filteredUsers);
          setEndDate(selectedDate);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    }
  };

  // Search text
  const handleSearch = (text: string) => {
    if (text === "") {
      getUserList();
      setSearchText("")
    } else {
      setSearchText(text);
      const filtered = filteredData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }

  // select state
  const handleStateChange = async (state: any) => {
    if (state == null) {
      getUserList();
    } else {
      axios.get(`${ApiUrl}/contacts/list`)
        .then(response => {
          const filtered = response.data.contact.filter((item: any) =>
            item.state == state
          );
          setFilteredData(filtered)
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    }
  }


  // select district
  const handleDistrictChange = async (district: any) => {
    if (district) {
      axios.get(`${ApiUrl}/contacts/list`)
        .then(response => {
          const filtered = response.data.contact.filter((item: any) =>
            item.district == district && item.state == selectedState
          );
          setFilteredData(filtered);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    }
  }

  useEffect(() => {
    getUserList();
  }, [])

  const getUserList = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${ApiUrl}/contacts/list`);
      ToastAndroid.showWithGravity(
        'Contact data fetched successfully!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setFilteredData(response.data.contact);
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Failed to submit form. Please try again later.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      console.error('Error submitting form:', error);
    } finally {
      setRefreshing(false);
    }
  };


  // Flatlist render
  const renderItem = ({ item, index }: { item: { id: string; name: string, mobile: string, profession: string, state: string, district: string, address: string, created_at: string } }) => (
    <View>
      <TouchableOpacity onPress={() => toggleAccordion(item.id)}>
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ borderRadius: 5, fontWeight: 'bold', fontSize: responsiveFontSize(3), backgroundColor:'gray', padding: responsiveWidth(3) }}>{index + 1}</Text>
            <View style={{ marginLeft: responsiveWidth(5) }}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.mobile}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {expanded === item.id && (
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Profession:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.profession}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>State:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.state}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>District:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.district}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Address:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.address}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Created Date:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>{item.created_at}</Text>
          </View>
        </View>
      )}
    </View>
  );


  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <View style={[styles.searchContainer, { justifyContent: 'space-around' }]}>
        <TouchableOpacity style={styles.button} onPress={() => setShowStartDatePicker(true)}>
          <Text style={styles.buttonText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>

        <View style={{ padding: responsiveWidth(3) }} />

        <TouchableOpacity style={styles.button} onPress={() => setShowEndDatePicker(true)}>
          <Text style={styles.buttonText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}
      </View>

      <View style={[styles.searchContainer, { bottom: responsiveHeight(1.5) }]}>
        <View style={pickerSelectStyles.inputAndroid}>
          <RNPickerSelect
            placeholder={{ label: 'Select State', value: null }}
            items={stateDistt.states.map((item, index) => (
              { label: item.state, value: item.state }
            ))}
            onValueChange={(value) => {
              handleStateChange(value)
              setSelectedState(value)
            }}
            value={selectedState}
          />
        </View>

        <View style={{ padding: responsiveWidth(2) }} />

        <View style={pickerSelectStyles.inputAndroid}>
          <RNPickerSelect
            placeholder={{ label: 'Select District', value: null }}
            items={stateDistt.states
              .filter(item => item.state === selectedState)
              .map(item => item.districts.map(disItem => ({ label: disItem, value: disItem })))
              .flat()} // Flatten the array
            onValueChange={value => {
              handleDistrictChange(value)
              setDistrict(value)
            }}
            value={district}
          />
        </View>
      </View>

      <View style={[styles.searchContainer, { justifyContent: 'space-around' }]}>
        <TouchableOpacity style={styles.button} onPress={() => handleDownloadExcel(filteredData)}>
          <Text style={styles.buttonText}>Download Excel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDownloadPDF(filteredData)}>
          <Text style={styles.buttonText}>Download PDF</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getUserList}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(3),
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(1),
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: responsiveWidth(11),
    paddingVertical: responsiveHeight(1),
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingVertical: responsiveHeight(1),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold'
  },
  searchInput: {
    flex: 1,
    height: responsiveHeight(5),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'space-around'
  },
  label: {
    fontWeight: 'bold',
  },
});

export default ContactScreen;