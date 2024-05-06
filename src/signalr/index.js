import signalr from 'react-native-signalr';
import { useDispatch, useSelector } from 'react-redux'; 
import { setAllPumps } from '../redux/pump';

export let connection = signalr.hubConnection(
"http://dev-egas-s.piacom.com.vn:6969/signalr"
)  ;
connection.logging = true;

connection.connectionSlow(() => {
  console.log(
    'We are currently experiencing difficulties with the connection.',
  );
});

export const start = async () => {   
    const accessToken = useSelector((state) =>state.auth.token)
    connection.qs = {accessToken: accessToken};
    connection
      .start({transport: 'webSockets'})
      .done(() => {
        console.log('Now connected, connection ID=' + connection.id);
    
      })
      .fail(() => {
 
      });
  
  // store.dispatch(
  //   DashboardActions.dashboardSetData([]),
  // );
  // store.dispatch(
  //   DashboardActions.dashboardSetConnected(constants.CONNECTION.reconnect),
  // );
};

connection.error(error => {
  const errorMessage = error.message;
  console.log(errorMessage);
  console.log('error');
  let detailedError = '';
  if (error.source && error.source._response) {
    detailedError = error.source._response;
  }
  if (
    detailedError ===
    'An SSL error has occurred and a secure connection to the server cannot be made.'
  ) {
    console.log(
      'When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14',
    );
  }

  console.debug('SignalR error: ' + errorMessage, detailedError);
});

export const proxy = connection.createHubProxy('stationhub');

proxy.on('ReceivedAllPumpData', data => {
});