import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Constants } from '../constants/Constants'
import { TotalPrice, formatAmount } from '../utils/TotalPrice'
import { COLORS, FONTSIZE } from '../theme/Theme'

const Bill = ({data, pumpName}) => {
    // console.log(pumpName)
  return (
    <View style = {styles.container}>
      <View style = {styles.left}>
        <Text style={styles.textLeft}>
            {Constants.code} :
        </Text>
        <Text style={styles.textLeft}>
            {Constants.item} :            
        </Text>
        <Text style={styles.textLeft}>
            {Constants.quantity} :
        </Text>
        <Text style={styles.textLeft}>
            {Constants.unit_price} :
        </Text>
        <Text style={styles.textLeft}>
            {Constants.total_price} :
        </Text>
        {data.ReceiptCode ? (
        <Text style = {styles.textLeft}>
            {Constants.ReceiptCode} :
        </Text>            
        ) : (
            ''
        )}

      </View>
      <View style = {styles.right}>
        <Text style = {styles.textRight}>
            {data.ProductCode}
        </Text>
        <Text style = {styles.textRight}>
            {pumpName.ProductName}
        </Text>
        <Text style = {styles.textRight}>
            {data.Volume}{Constants.liters}
        </Text>
        <Text style = {styles.textRight}>
            {(formatAmount(data.SalePrice))} {Constants.currency_unit}
        </Text>
        <Text style = {[styles.textRight , styles.totalText]}>
            {(formatAmount(data.Amount))} {Constants.currency_unit}
        </Text>
        {data.ReceiptCode ? (
            <Text style = {styles.textRight}>
                {data.ReceiptCode}
            </Text>
            ) : (
                ''
            )}
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
        fontSize : FONTSIZE.size_14

    },
    totalText:{
        color: COLORS.primaryRedHex
    }
})
export default Bill

