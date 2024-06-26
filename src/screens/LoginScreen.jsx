import React, { useState } from 'react'
import {
    Image, 
    StyleSheet, 
    Text, 
    TextInput, 
    ToastAndroid, 
    TouchableWithoutFeedback,
    View 
} from 'react-native'
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import PasswordInput from '../components/PasswordInput';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../theme/Theme';
import { Login } from '../api/auth/Login';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogin = async() => {
        // const authToken = await AsyncStorage.getItem('token');
        // console.log(authToken)
        const user = {
            deviceId: DeviceInfo.getDeviceId(), 
            deviceModel: DeviceInfo.getModel(), 
            deviceToken: "", 
            password: password, 
            userAgent: DeviceInfo.getSystemName(), 
            username: username
        }
        try {
            await Login(user,dispatch);
            
            // setUsername('');
            // setPassword('');
            // console.log(result.accessToken)
            // console.log("Login success")
        } catch (error) {
            console.error('Errors:', error);
        }
    };
  
  return (
    <View style = {styles.container}>
        <View style = {styles.logo}>
            <Image
                source={require('../assests/logo/petrolimex.png')}
                style = {styles.img_logo}
            />
        </View>
        <View style={styles.container_input}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#666"
                value={username}
                onChangeText={setUsername}
            />
            <PasswordInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableWithoutFeedback onPress={handleLogin}>
                <View style = {styles.button}>
                    <Text style = {styles.text_button}>
                        LOGIN
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo: {
        alignItems: 'center',
        paddingTop: 80
    },
    img_logo: {
      height: 150,
      width: 200,              
    },
    container_input: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 50
    },
    input: {
        color: COLORS.primaryBlackHex,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 10,
        paddingRight: "40%",
        paddingLeft: "40%",
        borderRadius: BORDERRADIUS.radius_8
    },
    text_button: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
        fontWeight: "bold",
        fontFamily: FONTFAMILY.poppins_semibold,
    }
})

export default LoginScreen

