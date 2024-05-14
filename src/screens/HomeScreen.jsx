import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderBar from '../components/HeaderBar';
import { COLORS, FONTSIZE } from "../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { proxy } from "../signalr";

const HomeScreen = () => {
    const ListPumps = useSelector((state) => state.pump.ListPumps)

    const navigation = useNavigation();
    
    const [logItem, setLogItem] =useState([]);

    const [selectedItem, setSelectedItem] = useState();

    let isPumpLogEventRegistered = false;

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
        navigation.navigate('InfoLog', { data: data });
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
                                            width:30,
                                            height:30
                                        }}
                                    />                                    
                                </View>
                                <Text style={styles.datetime}>
                                    {item.LogTime}
                                </Text>
                                {/* <Text style={styles.datetime}>
                                    {item.date}
                                </Text>  */}
                                <View style = {styles.borderRight}>
                                    <View style = {styles.boderStatus}>
                                        {item.PaymentState == false ? (
                                            <Text style = {styles.textStatusN}>
                                                Đang chờ xử lý
                                            </Text>
                                        ) : (
                                            <Text style = {styles.textStatusY}>
                                                Đã thanh toán
                                            </Text>
                                        )}
                                    </View>
                                    <Text style = {styles.textTotal}>
                                        {(Number(item.Amount)).toLocaleString()}
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
        backgroundColor:COLORS.primaryWhiteHex,
    },
    BoxPump: {
      padding:10,
      paddingBottom: 10,
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
        paddingTop: 15,
        paddingBottom:10,
        paddingLeft: 15,
        flexDirection:"row",
        borderTopWidth: 1.1,
        borderTopColor: COLORS.secondaryBlackRGBA
    }   ,
    bill:{
        padding: 6,
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
        marginRight: 10
    },
    boderStatus:{
        padding:3,
        paddingLeft:10,
        paddingRight:10,
        borderWidth:1,
        borderColor: COLORS.primaryBlackRGBA,
        borderRadius: 7
    },
    textStatusN:{
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_12
    },
    textStatusY:{
        // paddingBottom:5,
        color: COLORS.primarygreenHex,
        fontSize: FONTSIZE.size_12
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
