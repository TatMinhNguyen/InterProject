import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ComeBack from '../components/ComeBack'
import { ComeBackHome, goBack } from '../utils/ComeBackHome'
import { COLORS } from '../theme/Theme'
import { useNavigation } from '@react-navigation/native'

const ExportBill = () => {

    const navigation = useNavigation();

    // const handleComeBackBill = ()=>{
    //     navigation.goBack()
    // }

    return (
        <View style = {styles.container}>
            <ComeBack comeback={goBack}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryWhiteHex
    }
})
export default ExportBill

