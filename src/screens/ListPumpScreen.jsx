import React, { useEffect, useState } from "react";
import { 
    FlatList, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    View ,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { COLORS, FONTSIZE } from "../theme/Theme";
import ButonComfirm from "../components/ButonComfirm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setListPumps } from "../redux/pump";
import { proxy } from "../signalr";

const ListPumpScreen = () => {
    const pumps = useSelector((state) => state.pump.AllPumps);
    const pumpSelected = useSelector((state) => state.pump.ListPumps);
    // console.log(pumpSelected)
    
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [checkedItems, setCheckedItems] = useState(pumpSelected);

    useEffect(() => {
        setCheckedItems(pumpSelected);
    }, [pumpSelected]);

    const handleComfirm = (data) => {
        proxy.invoke("UpdatePumpConfig", data);
        navigation.navigate('Home');
    };

    const handleCheckboxChange = (item) => {
        const index = checkedItems.findIndex(i => i.PumpId === item.PumpId);
        let newCheckedItems = [...checkedItems];

        if (index === -1) {
            newCheckedItems.push(item);
        } else {
            newCheckedItems.splice(index, 1);
        }

        setCheckedItems(newCheckedItems);
        dispatch(setListPumps(newCheckedItems));
    }; 

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={pumps}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.BoxPump}
                            onPress={() => handleCheckboxChange(item)}
                        >
                            <Text style={styles.text}>{item.PumpName}</Text>
                            <CheckBox
                                disabled={false}
                                value={checkedItems.some(checkedItem => checkedItem.PumpId === item.PumpId)}
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

