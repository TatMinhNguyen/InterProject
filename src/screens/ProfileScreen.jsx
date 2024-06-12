import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import ComeBack from '../components/ComeBack';
import { COLORS, FONTSIZE } from '../theme/Theme';
import ButonDeny from '../components/ButonDeny';
import { ComeBackHome } from '../utils/ComeBackHome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../redux/auth';
import { setClearPump } from '../redux/pump';

const ProfileScreen = () => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.login.currentUser);
    console.log(user)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (token) {
            dispatch(clearToken());
            dispatch(setClearPump());
        }
    }

  return (
    <View style = {styles.container}>
        <ComeBack comeback={ComeBackHome}/>
        <View style = {{alignItems:"center", height:"100%"}}>
            <View style = {styles.user}>
                <Image
                    source={require('../assests/icons/user.png')}
                    style = {{
                        height:60,
                        width:60
                    }}
                />
            </View>   
            <View style = {styles.name}>
                <Text style={styles.TextName}>
                    {user.username}
                </Text>
            </View>  
            <View>
                {/* <Text>
                    ID: 123456789
                </Text> */}
            </View> 
            <View style={styles.bottom}>
                <TouchableWithoutFeedback onPress={handleLogin}>
                    <View style={styles.buton}>
                        <ButonDeny buttonText="Đăng xuất"/>
                    </View>                
                </TouchableWithoutFeedback>
            </View>       
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        // alignItems:"center"
    },
    user:{
        marginTop:"40%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#ddd",
        height:100,
        width: 100,
        borderRadius: 50
    },
    name:{
        margin:20
    },
    TextName:{
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryBlackHex,
        fontWeight:"500"
    },
    bottom:{
        flex: 1, justifyContent: "flex-end", marginBottom: 30,
        width:"70%"
    },
    buton:{
        width: "auto"
    }
});

export default ProfileScreen;

