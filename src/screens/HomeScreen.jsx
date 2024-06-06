import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderBar from '../components/HeaderBar';
import { COLORS, FONTSIZE } from "../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { proxy } from "../signalr";
import { formatAmount } from "../utils/TotalPrice";
import { Constants } from "../constants/Constants";
import moment from "moment";

const HomeScreen = () => {
    const ListPumps = useSelector((state) => state.pump.ListPumps)

    const navigation = useNavigation();
    
    const [logItem, setLogItem] =useState([]);
    const [selectedItem, setSelectedItem] = useState();

    let isPumpLogEventRegistered = false;

    const getDate = (dateTimeString) =>{
        return moment(dateTimeString).format('YYYY-MM-DD');
    }

    const getTime = (dateTimeString) =>{
        return moment(dateTimeString).format('HH:mm:ss');
    }

    const changePumpFocus = (oldPumpId, newPumpId) => {
        setSelectedItem(newPumpId)
        proxy.invoke('changePumpFocus', oldPumpId, newPumpId)
            .done(function () {
                console.log('Successfully changed pump focus');
            })
            .fail(function (error) {
                console.log('Error changing pump focus: ' + error);
            });

        if (!isPumpLogEventRegistered) {
            proxy.on("receivedPumpLog", (data) => {
                // console.log(data)
                setLogItem(data)
            });
            isPumpLogEventRegistered = true;
        }
    };
    const filteredItems = logItem.filter(item => item.PumpId == selectedItem);

    useEffect(() => {
        if(ListPumps?.length !== 0){
            setSelectedItem(ListPumps[0]?.PumpId)
            console.log('length != 0')
        }else{
            navigation.navigate("List-pump")
            console.log('length == 0')
        }
    },[ListPumps?.length])

    const handleInfoLog = (data) => {
        if(data.PaymentState == false){
            navigation.navigate('InfoLog', { data: data });
        }
        else {
            navigation.navigate("Bill", {data: data})
        }
    }

    return (
        <View style={styles.container}>
            <HeaderBar />
            <FlatList
                data={ListPumps}
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({ item }) => (
                    <View>
                        <TouchableWithoutFeedback onPress={() => changePumpFocus( selectedItem, item.PumpId)}>
                            <View style={[styles.BoxPump]}>
                                {selectedItem === item.PumpId ? (
                                    <Image
                                        source={require('../assests/icons/gas-or.png')}
                                        style={{width:36, height:36}}
                                    />
                                ) : (
                                    <Image
                                        source={require('../assests/icons/gas-icons.png')}
                                        style={{width:36, height:36}}
                                    />
                                )}
                                <Text style={[
                                    item.PumpName.split(' ')[2].length === 1 && styles.text_id,
                                    item.PumpName.split(' ')[2].length === 2 && styles.text_idx,
                                    selectedItem === item.PumpId && styles.selectedItem,
                                ]}>
                                    {item.PumpName.split(' ')[2]}
                                </Text>
                                <Text style={[styles.text_type, selectedItem === item.PumpId && styles.selectedItem]}>
                                    {item.ProductName}
                                </Text>
                            </View>                            
                        </TouchableWithoutFeedback>
                    </View>

                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

            <FlatList
                data={filteredItems}
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({ item }) => (
                    <View >
                        <TouchableOpacity onPress={() => handleInfoLog(item)}>
                            <View style={styles.LogContainer}>
                                <View style = {styles.bill}>
                                    <Image
                                        source={require('../assests/icons/bill-black.png')}
                                        style={{
                                            width:31,
                                            height:30,
                                            marginTop: 2
                                        }}
                                    />                                    
                                </View>
                                <Text style={styles.datetime}>
                                    {getTime(item.LogTime)}
                                </Text>
                                <Text style={styles.datetime}>
                                    {getDate(item.LogTime)}
                                </Text> 
                                <View style = {styles.borderRight}>
                                    <View style = {styles.boderStatus}>
                                        {item.PaymentState == false ? (
                                            <View style = {styles.StatusN}>
                                            </View>
                                        ) : item.PaymentState == true && item.ReceiptExportStatus == false ? 
                                        (
                                            <View style = {styles.StatusY}>
                                            </View>
                                        ) : (
                                            <View style = {styles.StatusZ}>
                                            </View>
                                        )}
                                    </View>
                                    <Text style = {styles.textTotal}>
                                        {(formatAmount(item.Amount))} 
                                        {/* {Constants.currency_unit} */}
                                    </Text>
                                </View>                               
                            </View>
                        </TouchableOpacity>
                    </View>
                )}                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.primaryWhiteHex,
    },
    BoxPump: {
      padding:10,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectedItem: {
        color: COLORS.primaryOrangeHex
    },
    text_id: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: 12 }, { translateY: -5 }], 
        fontWeight:"600"
    },
    text_idx: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: 8 }, { translateY: -5 }], 
        fontWeight:"600"
    },
    text_type:{
        paddingTop:5,
        fontSize: FONTSIZE.size_12,
        fontWeight:"600",
    }  ,
    LogContainer:{
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        flexDirection:"row",
        borderTopWidth: 1.1,
        borderTopColor: COLORS.secondaryBlackRGBA
    }   ,
    bill:{
        padding: 5,
        borderWidth: 1.1,
        borderColor:COLORS.secondaryBlackRGBA,
        borderRadius: 10
    },
    datetime:{
        marginLeft:10,
        marginTop: 10,
        fontWeight: "bold",
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryBlackHex
    },
    borderRight:{
        marginLeft:"auto",
        marginRight: 10,
        // backgroundColor:"#ccc"
    },
    boderStatus:{
        // marginBottom:2,
        padding:3,    
    },
    StatusN:{
        width:40,
        height:10,
        backgroundColor: COLORS.primaryRedHex,
        marginLeft: "auto"
    },
    StatusZ:{
        width:40,
        height:10,
        backgroundColor: COLORS.primarygreenHex,
        marginLeft: "auto"
    },
    StatusY:{
        width:40,
        height:10,
        backgroundColor: COLORS.primaryyellowHex,
        marginLeft: "auto"
    },
    textTotal:{
        // paddingTop:5,
        marginLeft:"auto",
        fontSize : FONTSIZE.size_16,
        color: COLORS.primaryBlackHex,
        fontWeight:"bold"
    }
});

export default HomeScreen;
