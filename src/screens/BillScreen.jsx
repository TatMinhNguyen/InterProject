import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE } from '../theme/Theme'
import Bill from '../components/Bill';
import ButonComfirm from '../components/ButonComfirm';
import ButonDeny from '../components/ButonDeny';
import { ComeBackHome } from '../utils/ComeBackHome';

const BillScreen = ({ route }) => {
    const data = route.params;

    return (
      <View style = {styles.container}>
        <View style = {styles.header}>
            <Image
                source={require("../assests/icons/done.png")}
                style={{width: 40, height:40}}
            />
            <Text style = {styles.textHeader}>
                Thanh toán đã thành công !
            </Text>
        </View>
        <View style = {styles.body}>
            <View style = {styles.bodyTitle}>
                <Image
                    source={require('../assests/icons/bill-yl.png')}
                    style={{width: 35, height: 35}}
                />
                <Text style = {styles.textBody}>
                Hóa đơn
                </Text>
            </View>
            <View>
                <Bill
                    data = {data.data.data}
                /> 
                <Text style = {styles.textBodyBottom}>
                    Đã thanh toán
                </Text>           
            </View>            
        </View>
        <View style = {styles.footer}>
            <TouchableWithoutFeedback>
                <View style={styles.buton}>
                    <ButonComfirm buttonText = "Xuất hóa đơn"/>
                </View>                
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={ComeBackHome}>
                <View style={styles.buton}>
                    <ButonDeny buttonText = "Trở về trang chủ"/>
                </View>                
            </TouchableWithoutFeedback>
        </View>

      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 15,
        backgroundColor: COLORS.primaryWhiteHex
    },
    header:{
        alignItems:"center",
        paddingBottom:20,
        paddingTop: "20%"
    },
    textHeader:{
        marginTop:10,
        color: COLORS.primarygreenHex,
        fontSize: FONTSIZE.size_18,
        fontStyle : "italic"
    },
    body:{
        marginLeft: 10
    },
    bodyTitle:{
        flexDirection:"row",
        paddingBottom:20,
        marginTop: 30
    },
    textBody:{
        fontSize: FONTSIZE.size_18,
        fontWeight:"bold",
        color: COLORS.primaryBlackHex,
        margin:5,
        marginLeft:10        
    },
    textBodyBottom:{
        marginLeft:5,
        color: COLORS.primarygreenHex,
        fontStyle :"italic"
    },
    footer:{
        marginTop:"auto",
        alignItems:"center"
    },
    buton:{
        width: "80%",
        marginTop:3
    },
})
export default BillScreen

