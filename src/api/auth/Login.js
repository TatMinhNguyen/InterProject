import axios from "axios";
import { Base_URL } from "../../utils/Base_URL";
import { setToken } from "../../redux/auth";

const baseURL = Base_URL;

export const Login = async(user, dispatch) => {
    try {
        const res = await axios.post(`${baseURL}/api/TBCT/Identity/Auth/SignIn`, user);
        dispatch(setToken(res.data.data.accessToken))
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
}