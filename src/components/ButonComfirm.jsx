import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../theme/Theme';

const ButonComfirm = ({ buttonText }) => {
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
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 10,
        alignItems:"center",
        borderRadius: BORDERRADIUS.radius_8
    },
    text_button: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_18,
        fontWeight: "bold",
        fontFamily: FONTFAMILY.poppins_semibold,
    }
});

export default ButonComfirm;

