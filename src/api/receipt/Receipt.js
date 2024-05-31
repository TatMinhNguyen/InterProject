import axios from "axios";
import { Base_URL } from "../../utils/Base_URL";
import { ToastAndroid } from "react-native";

const baseURL = Base_URL;

export const Receipt = async(data, accessToken) =>{
    try {
        const res = await axios.get(`${baseURL}/api/TBCT/Payment/Receipt/GetInfoByTaxCode?TaxCode=${data}`,{
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravity(
            'Không tìm thấy thông tin công ty hoặc mã số thuế không đúng',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
}
