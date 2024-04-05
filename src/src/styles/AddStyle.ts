import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: responsiveWidth(3),
    },
    input: {
      height: responsiveHeight(6),
      borderColor: '#CCCCCC',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: responsiveWidth(3),
      paddingRight: responsiveWidth(3),
      marginTop: responsiveHeight(2)
    },
    addressInput: {
      height: responsiveHeight(10),
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
  deleteIcon: {
    fontSize: 20,
    color: 'red',
  },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 5,
      color: 'black',
    },
    inputAndroid: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 5,
      color: 'black',
      marginTop: responsiveHeight(2),
      flex: 1,
    },
  });

  export { styles, pickerSelectStyles }