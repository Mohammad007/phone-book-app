import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(8),
    },
    title: {
        fontSize: responsiveFontSize(4),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(5),
        color: '#5193F2'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        borderRadius: 5, // Customize border radius
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden', // Hide overflow for border radius
    },
    icon: {
        marginLeft: responsiveWidth(3),
        marginRight: responsiveWidth(3),
    },
    input: {
        flex: 1,
        height: responsiveHeight(5),
    },
    toggleIcon: {
        marginRight: responsiveWidth(2.5),
    },
    loginButton: {
        backgroundColor: '#5193F2',
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(10),
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;