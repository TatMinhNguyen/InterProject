import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTSIZE } from '../theme/Theme'
import Bill from '../components/Bill'
import ButonComfirm from '../components/ButonComfirm';
import ButonDeny from '../components/ButonDeny';
import { ComeBackHome } from '../utils/ComeBackHome';

const InfoLogScreen = ({ route }) => {
  const data = route.params;

  const [checked, setChecked] = useState('first');

  const navigation = useNavigation();

  const handleComfirm = (data) => {
    navigation.navigate("Bill", {data: data})
  }

  const handlePayment = (data) => {
    navigation.navigate("Payment", {data: data})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assests/icons/bill-yl.png')}
          style={{width: 35, height: 35}}
        />
        <Text style = {styles.textHeader}>
          Thông tin Log bơm
        </Text>
      </View>
      <Bill 
        data = {data.data}
      />
      <View style = {styles.body}>
        <View style = {styles.bodyTitle}>
          <Image
            source={require('../assests/icons/coin.png')}
            style={{width: 35, height:35}}
          />
          <Text style = {styles.textTitle}>
            Phương thức thanh toán
          </Text>          
        </View>
        <View style={styles.containerContent}>
          <TouchableWithoutFeedback onPress={() => setChecked('first')}>
            <View style={styles.radioButtonContainer} >
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={styles.radioButtonText}>Tiền mặt</Text>              
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback  onPress={() => setChecked('second')}>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text style={styles.radioButtonText}>Chuyển khoản</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style = {styles.footer}>
        {checked === 'first' ? (
          <TouchableWithoutFeedback onPress={() =>handleComfirm(data)}>
            <View style={styles.buton}>
              <ButonComfirm buttonText="Xác nhận thanh toán"/>
            </View>                
          </TouchableWithoutFeedback>          
        ): (
          <TouchableWithoutFeedback onPress={() =>handlePayment(data.data)}>
            <View style={styles.buton}>
              <ButonComfirm buttonText="Thanh toán"/>
            </View>                
          </TouchableWithoutFeedback>  
        )}
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
    flexDirection:"row",
    paddingBottom:20
  },
  textHeader:{
    fontSize: FONTSIZE.size_18,
    fontWeight:"bold",
    color: COLORS.primaryBlackHex,
    margin:5,
    marginLeft:10
  },
  body: {
    paddingLeft:5,
    marginTop: 30
  },
  bodyTitle:{
    flexDirection:"row"
  },
  textTitle:{
    margin:4,
    marginLeft:10,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_18,
  },
  containerContent: {
    justifyContent: 'center',
    margin: 10
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    marginLeft: 15, 
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
export default InfoLogScreen
