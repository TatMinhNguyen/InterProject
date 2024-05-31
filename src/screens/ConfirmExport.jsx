import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import ComeBack from '../components/ComeBack';
import { goBack } from '../utils/ComeBackHome';
import { COLORS, FONTSIZE } from '../theme/Theme';
import CompanyInformation from '../components/CompanyInformation';
import ButonComfirm from '../components/ButonComfirm';
import { proxy } from '../signalr';
import { removeSpecialCharacters } from '../utils/TotalPrice';
import { useRoute } from '@react-navigation/native';

const ConfirmExport = () => {
    const route = useRoute();
    const { data, dataLog } = route.params;
    // console.log (dataLog.data.data.TxnId)
    // console.log("data", data)

    const handleConfirm = (data, dataLog) => {
        proxy
            .invoke("SendCreateEInvoice", dataLog.data.data.TxnId, {
                Taxnumber: removeSpecialCharacters(data.mst),
                OrgName: data.name,
                name: data.name,
                Address: data.address,
                EmailAddress: data.email,
            })
            .done(() => {
                console.log('Export successfully')
            })
            .fail((e) => {
                console.log('Error confirm export: ' + e)
            });
    }
    return (
        <View style = {styles.container}>
            <ComeBack comeback={goBack}/>
            <View style={styles.body}>
                <View style={styles.headerBody}>
                    <Image
                        source={require('../assests/icons/bill-yl.png')}
                        style={{width: 35, height: 35}}
                    />
                    <Text style = {styles.textHeader}>
                        Thông tin doanh nghiệp
                    </Text>
                </View>
                <View>
                    <CompanyInformation 
                        data = {data}
                    />
                </View>                
            </View>
            <View style={styles.footer}>
                <TouchableWithoutFeedback onPress={() => handleConfirm(data, dataLog)}>
                    <View style={styles.buton}>
                      <ButonComfirm buttonText="Xác nhận xuất hóa đơn"/>
                    </View>                
                </TouchableWithoutFeedback> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.primaryWhiteHex,
        height: "100%"
    },
    body:{
        marginBottom:"70%",
        marginLeft:5
    },
    headerBody:{
        flexDirection:"row",
        paddingBottom:20,
        // marginBottom:" 50%"
    },
    textHeader:{
        fontSize: FONTSIZE.size_18,
        fontWeight:"bold",
        color: COLORS.primaryBlackHex,
        margin:5,
        marginLeft:10
    },
    footer:{
        marginTop:"auto",
        alignItems:"center",
        marginBottom:"15%"
    },
    buton:{
        width: "80%",
        marginTop:3
    },
})

export default ConfirmExport

