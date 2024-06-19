import { FlatList, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import ComeBack from '../components/ComeBack'
import { ComeBackHome, goBack } from '../utils/ComeBackHome'
import { COLORS, FONTSIZE } from '../theme/Theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { DataMT } from '../data/LogInfoData'
import { removeSpecialCharacters } from '../utils/TotalPrice'
import { Receipt } from '../api/receipt/Receipt'
import { useSelector } from 'react-redux'

const ExportBill = () => {
    const route = useRoute();
    const { dataLog, pumpName } = route.params;
    // console.log(dataLog)
    const accessToken = useSelector((state) =>state.auth.token)

    const navigation = useNavigation();

    const [search, setSearch] = useState('')
    const [datas, setData] = useState([]);

    const handleExportBill = (data, dataLog) =>{
        navigation.navigate("Confirm-Export", { data, dataLog, pumpName })
    }

    const handleSearch = async() => {
        try {
            const result = await Receipt(search, accessToken);
            // console.log("result", result)
            setData(result);

            setSearch('');           
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <View>
                    <ComeBack comeback={goBack}/>
                </View>
                <View style = {styles.borderInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mã số thuế cần xuất hóa đơn"
                        placeholderTextColor="#666"
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={handleSearch} // Gọi API khi nhấn nút "OK"
                        returnKeyType="search" // Thay đổi phím "Return" trên bàn phím thành "Search"
                    />                    
                </View>
                <TouchableWithoutFeedback onPress={handleSearch}>
                    <View style={styles.icon_search}>
                        <Image
                            source={require('../assests/icons/search.png')}
                            style={{width:25, height:25,opacity: 0.5,}}
                        />
                    </View>                    
                </TouchableWithoutFeedback>
            </View> 
            <View style={styles.body}>
                <FlatList
                    data={datas}
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({ item }) =>(
                        <TouchableWithoutFeedback onPress = {() => handleExportBill(item, dataLog)}>
                            <View style={styles.content}>
                                <Text style={styles.text1}>{item.name}</Text>
                                <Text style={styles.text2}>{item.address}</Text>
                                <Text style={styles.text3}>
                                    Mã số thuế: {removeSpecialCharacters(item.mst)}
                                </Text>
                            </View>                            
                        </TouchableWithoutFeedback>
                    )}
                />
            </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.primaryWhiteHex,
    },
    header:{
        flexDirection:"row",
        position: 'relative',
    },
    input: {
        color: COLORS.primaryBlackHex,
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    borderInput:{
        width:"75%",
        marginLeft:"4%",
        marginTop:10,
        // marginRight:"auto"
    },
    icon_search:{
        position: 'absolute',
        top: '45%',
        left: '80%',
        transform: [{ translateX: 12 }, { translateY: -5 }], 
    },
    body:{
        marginTop: 10,
        marginBottom:5
    },
    content:{
        padding:5,
        borderTopWidth: 1,
        borderTopColor:"#ddd"
    },
    text1:{
        fontSize: FONTSIZE.size_16,
        fontWeight: "600",
        color: COLORS.primaryBlackHex
    },
    text2:{
        color: COLORS.primaryBlackHex
    },
    text3:{
        color: COLORS.primaryBlackHex,
        fontWeight:"500"
    }
})
export default ExportBill

