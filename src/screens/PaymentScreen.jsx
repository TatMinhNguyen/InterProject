import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation, useRoute } from "@react-navigation/native";
import ComeBack from '../components/ComeBack';
import { ComeBackHome, goBack } from '../utils/ComeBackHome';
import ButonComfirm from '../components/ButonComfirm';
import PaymentInfo from '../components/PaymentInfo';
import { COLORS, FONTSIZE } from '../theme/Theme';
import { Constants } from '../constants/Constants';
import moment from 'moment';
import { proxy } from '../signalr';

const PaymentScreen = () => {
    const route = useRoute();
    const { data, pumpName } = route.params;
    // console.log(data.data)
    // const paymentInfo = PaymentCode; 

    const navigation = useNavigation();

    const [isCheck,setIsCheck] = useState(false);

    const [currentTime, setCurrentTime] = useState('');
    const [currentTimeRequest, setCurrentTimeRequest] = useState('');
    // console.log(currentTime)
    // console.log(currentTimeRequest)
  
    const getCurrentFormattedTime = () => {
      return moment().format('DDMMYYYYHHmmssSSS');
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTimeRequest(getCurrentFormattedTime());
      }, 1000); // Cập nhật mỗi giây
  
      return () => clearInterval(interval); // Clear interval khi component unmount
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
      }, 1000); // Cập nhật mỗi giây
  
      return () => clearInterval(interval); // Clear interval khi component unmount
    }, []);

    const handleComfirm = (data) => {
      proxy
        .invoke("sendConfirmPayment", data.TxnId, {
          PaymentAmount: data.Amount,
          PaymentRequestId: currentTimeRequest,
          PaymentType: 3,
          PaymentDate: currentTime,
        })
        .done(() => {
          navigation.navigate("Bill", {data, pumpName})
          console.log('Successfully confirm payment');
        })
        .fail((e) => {
          console.log('Error confirm payment: ' + e)
        });
    }
  
    return (
      <View style={styles.container}>
        <ComeBack comeback={goBack}/>
        <View style = {styles.body}>
          <View>
            <PaymentInfo data = {data}/>
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
      width:"77%",
      height:"auto"
    },
    footer:{
      alignItems:"center",   
    }
});
export default PaymentScreen

