import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from "@react-navigation/native";
import { PaymentCode } from '../data/PaymentCode';
import ComeBack from '../components/ComeBack';
import { ComeBackHome } from '../utils/ComeBackHome';
import ButonComfirm from '../components/ButonComfirm';
import PaymentInfo from '../components/PaymentInfo';
import { COLORS, FONTSIZE } from '../theme/Theme';
import { Constants } from '../constants/Constants';

const PaymentScreen = ({ route }) => {
    const data = route.params;
    // console.log(data)
    // const paymentInfo = PaymentCode; 

    const [isCheck,setIsCheck] = useState(false);

    const navigation = useNavigation();

    const handleComfirm = (data) => {
      navigation.navigate("Bill", {data: data})
    }
  
    return (
      <View style={styles.container}>
        <ComeBack comeback={ComeBackHome}/>
        <View style = {styles.body}>
          <View>
            <PaymentInfo data = {data.data}/>
          </View>        
          <View style = {styles.QRCode}>
            <QRCode
              value={data.QrContent}
              size={0.3 * Dimensions.get('window').height}
            />          
          </View>

          <View style={styles.bottom}>
            <View style={styles.note}>
              <Text style={styles.text_note}>
                {Constants.note1}
              </Text> 
              <Text style={styles.text_note}>
                {Constants.note2}  
              </Text>           
            </View>            
              <TouchableWithoutFeedback onPress={() =>handleComfirm(data)}>
                <View style={styles.buton}>
                  <ButonComfirm buttonText="Kiểm tra kết quả thanh toán"/>
                </View>                
              </TouchableWithoutFeedback>
          </View>
          {isCheck == false ? (
            ''
          ):(
          <View style={styles.footer}>
            <Text style = {styles.text_note}>{Constants.note3}</Text>
            <Text style = {styles.text_note}>{Constants.note4}</Text>
          </View>
          )}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primaryWhiteHex
    },
    body:{
      flex: 100,
      marginTop: 50,
      margin:20,
    },
    QRCode:{
      marginTop:10,
      justifyContent: 'center',
      alignItems: 'center',      
    },
    note:{
      alignItems: "center",
      // marginTop: "10%"
    },
    text_note:{
      color: COLORS.primaryRedHex,
      fontSize: FONTSIZE.size_16,
      fontStyle: "italic"
    },
    bottom:{
      flex:1,
      justifyContent: "flex-end", 
      marginBottom: "5%",
      alignItems:"center"
    },
    buton:{
      marginTop:"6%",
      width:"75%",
      height:"auto"
    },
    footer:{
      alignItems:"center",   
    }
});
export default PaymentScreen

