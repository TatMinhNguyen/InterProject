import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Constants } from '../constants/Constants'
import { COLORS, FONTSIZE } from '../theme/Theme'
import { TotalPrice } from '../utils/TotalPrice'
import { ownerBank } from '../data/PaymentCode'

const PaymentInfo = ({data}) => {
  return (
    <View style = {styles.container}>
      <View style = {styles.left}>
        <Text style={styles.textLeft}>
            {Constants.bank_name} :
        </Text>
        <Text style={styles.textLeft}>
            {Constants.bank_account_number} :            
        </Text>
        <Text style={styles.textLeft}>
            {Constants.bank_account_owner} :
        </Text>
        <Text style={styles.textLeft}>
            {Constants.amount_money} :
        </Text>
        <Text style={styles.textLeft}>
            {Constants.transfer_content} :
        </Text>
      </View>
      <View style = {styles.right}>
        <Text style = {styles.textRight}>
            {ownerBank.bank_name}
        </Text>
        <Text style = {styles.textRight}>
            {ownerBank.bank_account_number}
        </Text>
        <Text style = {styles.textRight}>
            {ownerBank.bank_account_owner}
        </Text>
        <Text style = {[styles.textRight , styles.totalText]}>
            {TotalPrice(data.quantity, data.unit_price).toLocaleString()} {Constants.currency_unit}
        </Text>        
        <Text style = {styles.textRight}>
            {data.code}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:5
    },
    left:{

    },
    right:{
        marginLeft:"auto"
    },
    textLeft:{
        marginBottom: 15,
        color: COLORS.primaryBlackHex,
        fontSize : FONTSIZE.size_14,
        fontWeight:"500"
    },
    textRight:{
        marginLeft:"auto",
        marginBottom: 15,
        color: COLORS.primaryBlackHex,
        fontSize : FONTSIZE.size_16

    },
    totalText:{
        color: COLORS.primaryRedHex
    }
})

export default PaymentInfo

