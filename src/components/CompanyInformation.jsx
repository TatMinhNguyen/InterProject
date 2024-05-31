import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { removeSpecialCharacters } from '../utils/TotalPrice'
import { COLORS, FONTSIZE } from '../theme/Theme'

const CompanyInformation = ({ data }) => {
    // console.log(data)
    return (
        <View style = {styles.container}>
            <View style = {styles.box1}>
                <Text style = {styles.text}>Tên:</Text>
                <Text style = {styles.text1}>{data.name}</Text>
            </View>
            <View style = {styles.box2}>
                <Text style = {styles.text}>Địa chỉ:</Text>
                <Text style = {styles.text2}>{data.address}</Text>   
            </View>
            <View style = {styles.box3}>
                <Text style = {styles.text}>Mã số thuế:</Text >
                <Text style = {styles.text3}>{removeSpecialCharacters(data.mst)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:5,
        // flexDirection:"row"
    },
    box1:{
        flexDirection:"row",
        marginRight:"15%",
        marginBottom: 25,
        // backgroundColor:"#ccc"
    },
    box2:{
        flexDirection:"row",
        marginRight:"15%",
        marginBottom: 25,
        // backgroundColor:"#ccc"
    },
    box3:{
        flexDirection:"row",
        marginRight:"15%",
        marginBottom: 25,
        // backgroundColor:"#ccc"
    },
    text:{
        // marginBottom: 50,
        fontSize: FONTSIZE.size_16,
        color:COLORS.primaryBlackHex
    },
    text1:{
        // marginBottom: 25,
        fontSize: FONTSIZE.size_16,
        color:COLORS.primaryBlackHex,
        fontWeight:"500",
        marginLeft:65
    },
    text2:{
        // marginBottom: 19,
        fontSize: FONTSIZE.size_16,
        color:COLORS.primaryBlackHex,
        marginLeft: 45
    },
    text3:{
        fontSize: FONTSIZE.size_16,
        color:COLORS.primaryBlackHex,
        marginLeft: 15
    },
})
export default CompanyInformation

