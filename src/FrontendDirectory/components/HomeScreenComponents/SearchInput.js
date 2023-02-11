import { StyleSheet, Text, TextInput, View } from "react-native";
import  Colors  from "../../data/colors";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function SearchInput() {
    return (
        <View style={styles.container}>
            <View style={styles.seacrhBox}>
                <View style={styles.searchIcon}>
                    <Feather name="search" size={20} color={Colors.subBlack} />
                </View>
                <TextInput style={styles.textInput} placeholder="What are you looking for?" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 20
    },
    seacrhBox: {
        flexDirection: 'row',
    },
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.labelGray,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    filterIcon: {}
  });

export default SearchInput;