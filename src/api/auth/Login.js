import axios from "axios";
import { Base_URL } from "../../utils/Base_URL";
import { setLogin, setToken } from "../../redux/auth";
import { ToastAndroid } from "react-native";

const baseURL = Base_URL;

export const Login = async(user, dispatch) => {
    try {
        const res = await axios.post(`${baseURL}/api/TBCT/Identity/Auth/SignIn`, user);

        dispatch(setToken(res.data.data.accessToken))
        dispatch(setLogin(res.data.data))

        // console.log(res.data.data)
        return res.data.data;    
    } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravity(
            'Tài khoản hoặc mật khẩu không chính xác',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
}