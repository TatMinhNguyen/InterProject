import React, { useState } from "react";
import { 
    FlatList, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    View ,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import PumpData from "../data/PumpData";
import { COLORS, FONTSIZE } from "../theme/Theme";
import ButonComfirm from "../components/ButonComfirm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setListPumps } from "../redux/pump";
import { proxy } from "../signalr";

const ListPumpScreen = () => {
    const ListPump = PumpData;


    proxy.on('ReceivedAllPumpData', data => {
        console.log('Dữ liệu nhận được từ máy chủ:', data);
    });


    const [checkedItems, setCheckedItems] = useState([]);
    // console.log(checkedItems)

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const handleComfirm = (data) =>{
        dispatch(setListPumps(data))
        navigation.navigate('Home', {data: data})
    }

    const handleCheckboxChange = (id) => {
        const index = checkedItems.indexOf(id);
        if (index === -1) {
            setCheckedItems([...checkedItems, id]);
        } else {
            const newCheckedItems = [...checkedItems];
            newCheckedItems.splice(index, 1);
            setCheckedItems(newCheckedItems);
        }
    };  
    return (
      <>
        <View style={styles.container}>
            <FlatList
                data={ListPump}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.BoxPump}
                    onPress={() => handleCheckboxChange(item)}
                >
                    <Text style={styles.text}>{item.name}</Text>
                    <CheckBox
                        disabled={false}
                        value={checkedItems.includes(item)}
                        onValueChange={() => handleCheckboxChange(item)}
                    />
                </TouchableOpacity>
                )}
            />
        </View> 
        <View style={styles.bottom}>
            <TouchableWithoutFeedback onPress={() => handleComfirm(checkedItems)}>
                <View style={styles.buton}>
                    <ButonComfirm buttonText="Xác nhận"/>
                </View>                
            </TouchableWithoutFeedback>
        </View>      
      </>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 20,
        paddingLeft:10,
        backgroundColor: "#fff"
    },
    BoxPump: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text:{
        fontSize: FONTSIZE.size_18,
        fontWeight: "600",
        color: COLORS.primaryBlackHex
    },
    bottom:{
        backgroundColor: COLORS.primaryWhiteHex,
        alignItems:"center",
        paddingBottom: 20,
        paddingTop: 20
    },
    buton:{
        width: "75%"
    }
});
export default ListPumpScreen
