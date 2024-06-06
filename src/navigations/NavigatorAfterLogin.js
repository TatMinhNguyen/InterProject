import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ListPumpScreen from '../screens/ListPumpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InfoLogScreen from '../screens/InfoLogScreen';
import BillScreen from '../screens/BillScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { proxy, start } from '../signalr';
import { useDispatch } from 'react-redux';
import { setAllPumps, setListPumps } from '../redux/pump';
import { setAccountBank } from '../redux/bank';
import ExportBill from '../screens/ExportBill';
import ConfirmExport from '../screens/ConfirmExport';

const Stack = createNativeStackNavigator();

const NavigatorAfterLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await start();
    };
    
    fetchData();
  }, []);

  // start()
  

  proxy.on('ReceivedAllPumpData', data => {
    dispatch(setAllPumps(data));
  });

  proxy.on('receivedPumpConfig', data => {
    dispatch(setListPumps(data))
  })

  proxy.on('ReceivedStationInfo', data => {
    // console.log(data)
    dispatch(setAccountBank(data))
  })

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="List-pump" component={ListPumpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="InfoLog" component={InfoLogScreen} />
        <Stack.Screen name="Bill" component={BillScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Export" component={ExportBill} />
        <Stack.Screen name="Confirm-Export" component={ConfirmExport} />
    </Stack.Navigator>
  )
}

export default NavigatorAfterLogin