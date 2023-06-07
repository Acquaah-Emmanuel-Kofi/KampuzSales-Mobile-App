import { StyleSheet, Text } from "react-native";
import  AppColors  from "../data/Colors";

function CediSign({buttonText}) {
    return (
        <Text style={styles.text}>GH₵</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: AppColors.black
    }
  });

export default CediSign;