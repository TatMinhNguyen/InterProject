import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import ComeBack from '../components/ComeBack';
import { ComeBackHome, goBack } from '../utils/ComeBackHome';
import { COLORS, FONTSIZE } from '../theme/Theme';
import CompanyInformation from '../components/CompanyInformation';
import ButonComfirm from '../components/ButonComfirm';
import { proxy } from '../signalr';
import { removeSpecialCharacters } from '../utils/TotalPrice';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmExport = () => {
    const route = useRoute();
    const { data, dataLog, pumpName } = route.params;
    // console.log (dataLog)
    // console.log(pumpName)
    // console.log(data)

    const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCheckBill = (data) => {
        setModalVisible(false)
        ComeBackHome()
    }

    const handleConfirm = (data, dataLog) => {
        proxy
            .invoke("SendCreateEInvoice", dataLog.TxnId, {
                Taxnumber: removeSpecialCharacters(data.mst),
                OrgName: data.name,
                name: data.name,
                Address: data.address,
                EmailAddress: data.email,
            })
            .done(() => {
                console.log('Export successfully')
                setModalMessage('Xuất hóa đơn thành công!');
                setModalVisible(true);
            })
            .fail((e) => {
                console.log('Error confirm export: ' + e.message)
                setErrorMessage('Lỗi khi xuất hóa đơn: '+ e.message);
                setModalVisible(false);
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

            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => handleCheckBill(dataLog)}
                        >
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.primaryWhiteHex,
        // height: "100%"
    },
    body:{
        marginTop: 50,
        marginBottom:"50%",
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
        marginBottom:"10%"
    },
    buton:{
        width: "80%",
        // marginTop:3
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.primaryBlackHex
    },
    closeButton: {
        backgroundColor: COLORS.primaryBlueHex,
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    closeButtonText: {
        color: COLORS.primaryWhiteHex,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorText: {
        color: COLORS.primaryRedHex,
        textAlign: 'center',
        marginBottom: 20
    },
})

export default ConfirmExport

