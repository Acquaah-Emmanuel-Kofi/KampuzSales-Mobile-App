import { StyleSheet, Text, TextInput, View } from "react-native";
import  Colors  from "../data/colors";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from 'react-native-vector-icons/Ionicons';

function SearchInput() {
    return (
        <View style={styles.container}>
            <View style={styles.seachBoxRow}> 
                {/* <Ionicons style={styles.searchBackIcon} name="chevron-back-sharp" size={30} color={Colors.black} /> */}
                <View style={styles.seacrhBox}>
                    <Feather style={styles.searchIcon} name="search" size={20} color={Colors.subBlack} />
                    <TextInput style={styles.textInput} placeholder="What are you looking for?" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    seachBoxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBackIcon: {
        marginRight: 15,
    },
    seacrhBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.labelGray,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '100%'
    },
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
  });

export default SearchInput;