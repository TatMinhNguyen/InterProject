import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../theme/Theme'

const ButonDeny = ({buttonText}) => {
  return (
    <View style = {styles.button}>
        <Text style = {styles.text_button}>
            {buttonText}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ccc",
        padding: 10,
        alignItems:"center",
        borderRadius: BORDERRADIUS.radius_8
    },
    text_button: {
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_16,
        fontWeight: "700",
        fontFamily: FONTFAMILY.poppins_semibold,
    }
})
export default ButonDeny;

