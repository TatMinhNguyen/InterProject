import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderBar from '../components/HeaderBar';
import { COLORS, FONTSIZE } from "../theme/Theme";
import { LogInfoData } from "../data/LogInfoData";
import { TotalPrice } from "../utils/TotalPrice";
import { useSelector } from "react-redux";
import { proxy } from "../signalr";

const HomeScreen = ({ route }) => {
    const ListPumps = useSelector((state) => state.pump.ListPumps)
    // console.log(ListPumps?.length)
    const data = route.params;

    const navigation = useNavigation();
    
    const [firstItem, setFirstItem] =useState(null);
    // console.log(firstItem.id)

    const [selectedItem, setSelectedItem] = useState();
    // console.log(selectedItem)

    const filteredItems = LogInfoData.filter(item => item.pump === selectedItem);
    // console.log(filteredItems)

    useEffect(() => {
        if(ListPumps?.length !== 0){
            setFirstItem(ListPumps[0])
            setSelectedItem(ListPumps[0]?.id)
            console.log('length != 0')
        }else{
            navigation.navigate("List-pump")
            console.log('length == 0')
        }
    },[ListPumps?.length])

    // useEffect(() => {
    //     setSelectedItem(firstItem.id)
    // },[firstItem])

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
                        <TouchableWithoutFeedback onPress={() => setSelectedItem(item.id)}>
                            <View style={[styles.BoxPump]}>
                                {selectedItem === item.id ? (
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
                                <Text style={[styles.text_id, selectedItem === item.id && styles.selectedItem]}>
                                    {item.id}
                                </Text>
                                <Text style={[styles.text_type, selectedItem === item.id && styles.selectedItem]}>
                                    {item.item}
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
                                    {item.time}
                                </Text>
                                <Text style={styles.datetime}>
                                    {item.date}
                                </Text> 
                                <View style = {styles.borderRight}>
                                    <View style = {styles.boderStatus}>
                                        {item.status == 0 ? (
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
                                        {TotalPrice(item.quantity , item.unit_price).toLocaleString()}
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
