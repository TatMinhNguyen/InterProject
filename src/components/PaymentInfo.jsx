import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Constants } from '../constants/Constants'
import { COLORS, FONTSIZE } from '../theme/Theme'
import { formatAmount } from '../utils/TotalPrice'
import { useSelector } from 'react-redux'

const PaymentInfo = ({data}) => {
    const AccountBank = useSelector((state) => state.bank.BankAccount);
    // console.log(AccountBank)

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
                {AccountBank.BankShortName}
            </Text>
            <Text style = {styles.textRight}>
                {AccountBank.AccountNumber}
            </Text>
            <Text style = {styles.textRight}>
                {/* {AccountBank.BankName} */}
            </Text>
            <Text style = {[styles.textRight , styles.totalText]}>
                {formatAmount(data.Amount)} {Constants.currency_unit}
            </Text>        
            <Text style = {styles.textRight}>
                {data.TxnId}
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
        marginLeft:"auto",
        // marginBottom: 5
    },
    textLeft:{
        marginBottom: 16,
        color: COLORS.primaryBlackHex,
        fontSize : FONTSIZE.size_14,
        fontWeight:"500"
    },
    textRight:{
        marginLeft:"auto",
        marginBottom: 13,
        color: COLORS.primaryBlackHex,
        fontSize : FONTSIZE.size_16

    },
    totalText:{
        color: COLORS.primaryRedHex
    }
})

export default PaymentInfo

