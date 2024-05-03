import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'

const ComeBack = ({comeback}) => {
  return (
    <View style={styles.container}>
        <View style = {styles.header}>
            <TouchableNativeFeedback onPress={comeback}>
                <Image
                    source={require('../assests/icons/back.png')}
                    style={{
                        width:30,
                        height:30
                    }}
                />            
            </TouchableNativeFeedback>            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        margin: 10
    }
});
export default ComeBack;

