import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        secureTextEntry={!showPassword} 
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setShowPassword(!showPassword)}>
        <Image
            source={showPassword ? require('../assests/icons/show-pass.png') : require('../assests/icons/hide-pass.png')} 
            style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ccc',
      marginBottom: 30,
    },
    iconContainer: {
      position: 'absolute',
      right: 10,
      top: "25%"
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: 'gray',
    },
});

export default PasswordInput;