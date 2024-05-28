import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();

export const ComeBackHome = () =>{
    navigation.navigate("Home");
}

export const goBack = () => {
    navigation.goBack();
}