import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorAfterLogin from './NavigatorAfterLogin';
import NavigatorBeforeLogin from './NavigatorBeforeLogin';
import { useSelector } from 'react-redux';

const RootNavigation = () => {
    const token = useSelector((state) => state.auth.token);
    return (
        <NavigationContainer>
            {!token? (
                <NavigatorBeforeLogin/>
            ) : (
                <NavigatorAfterLogin/>
            )}
        </NavigationContainer>
    );
}

export default RootNavigation;