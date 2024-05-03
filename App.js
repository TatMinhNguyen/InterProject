import React from 'react';
import RootNavigation from './src/navigations';
import { Provider } from 'react-redux';
import  {store}  from './src/redux/store';
import {persistor}  from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App =() => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigation/>
      </PersistGate>
    </Provider>
  );
}

export default App;
