import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


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

export { styles }