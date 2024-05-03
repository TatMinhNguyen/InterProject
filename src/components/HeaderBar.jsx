import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const HeaderBar = () => {
    const navigation = useNavigation(); 

    const handlePump = () =>{
      navigation.navigate('List-pump');
    }
    const handleUser = () => {
      navigation.navigate('Profile');
    }
    return (
        <View style={styles.HeaderContainer}>
          <Image
            source={require('../assests/logo/petrolimex.png')}
            style={{
              width: 60,
              height: 50,
          }}
          />
          <View style = {styles.box}>
            <TouchableOpacity onPress={handlePump}>
              <Image
                source={require('../assests/images/gas.png')}
                style = {{
                  width:40,
                  height:40,
                  marginRight: 10,
                  marginTop:3
                }}
              />
            </TouchableOpacity>          
            <TouchableOpacity onPress={handleUser}>
              <Image
                source={require('../assests/images/user.png')}
                style = {{
                  width:45,
                  height:45,
                }}
              />
            </TouchableOpacity>            
          </View>

        </View>
    );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: "#B5E2FF"
  },
  box: {
    flexDirection:"row",
    marginLeft:"auto",
    marginRight:10
  }
});

export default HeaderBar;