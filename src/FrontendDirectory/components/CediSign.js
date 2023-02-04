import { StyleSheet, Text } from "react-native";
import  Colors  from "../data/colors";

function CediSign({buttonText}) {
    return (
        <Text style={styles.text}>GH₵</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Colors.black
    }
  });

export default CediSign;