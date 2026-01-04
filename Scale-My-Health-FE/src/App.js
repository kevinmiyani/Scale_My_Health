import React, { useEffect } from 'react'
import { NavigationHandler } from './navigation/NavigationHandler';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import socketServices from './api/Socket';
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from './redux/helper';
import { useNotification } from './hooks/notification/useNotification';
import { useFCM } from './hooks/notification/useFCM';
import { setFCMTokenInRedux } from './redux/FCMToken/FCMTokenAction';
import { getAuthID, getUserRole, removeAuthID, removeUserRole, storeUserRole } from './constants/AsyncStorage';
import { removeAuthIDFromRedux, setAuthIDInRedux } from './redux/Authentication/AuthAction';
import { removeUserDataFromRedux, setUserDataInRedux } from './redux/UserData/UserDataAction';
import { sockets } from './api/helper';
import { Alert, Platform } from 'react-native';
import { getDoctorDataByIdAPI, getPatientDataByIdAPI } from './api/utils';
import { currentDevice } from './utils/currentDevice';
import { NavigationScreens, navigationToReset } from './navigation/helper';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSocketContext } from './components/socket/SocketContext';
import ConnectionIndicatior from './components/socket/ConnectionIndicatior';

const navigationRef = createNavigationContainerRef();

const { requestNotificationPermission, handleNotification } = useNotification({ navigationRef });

const App = () => {

  const authId = useSelector(state => state[reducers.AuthReducer]);
  const userData = useSelector(state => state[reducers.UserDataReducer]);
  const dispatch = useDispatch();
  const { fcmToken } = useFCM();
  const { isConnected } = useNetInfo();
  const { socketConnected, setSocketConnected } = useSocketContext();

  useEffect(() => {
    requestNotificationPermission();
    getDataFromStorage();
  }, []);

  useEffect(() => {
    socketServices?.socket?.disconnect();
    if (isConnected) {
      socketServices.initializeSocket(undefined, setSocketConnected);
    }
  }, [isConnected])

  useEffect(() => {
    if (userData?.role) {
      if (authId && authId != '') {
        socketServices.emit(sockets.JoinSocket, authId);
      }
      socketServices.on(sockets.LoginExpire, () => { onLoginExpire(true) });
      if (Platform.OS === 'ios' && userData?.role == 'patient') {
        socketServices.on(sockets.VideoCall.incomingCallNotification, handleNotification);
        socketServices.on(sockets.VideoCall.missCallNotification, handleNotification);
      }
    }
    return () => {
      if (authId && authId != '') { socketServices.emit(sockets.LeaveSocket, authId); }
      if (Platform.OS === 'ios') {
        socketServices.removeListener(sockets.VideoCall.incomingCallNotification);
        socketServices.removeListener(sockets.VideoCall.missCallNotification);
      }
    }
  }, [socketConnected, userData?.role, authId]);

  useEffect(() => {
    fcmToken && fcmToken != '' && dispatch(setFCMTokenInRedux(fcmToken));
  }, [fcmToken])

  const getDataFromStorage = async () => {
    const authId = await getAuthID();
    const userRole = await getUserRole();
    dispatch(setAuthIDInRedux(authId));
    if (authId && userRole) {
      checkUserData(authId, userRole);
    } else {
      dispatch(setUserDataInRedux({}));
    }
  }

  const checkUserData = async (id, role) => {
    try {
      const res = role == 'doctor' ? await getDoctorDataByIdAPI(id) : await getPatientDataByIdAPI(id);
      if (res?.data?.status) {
        const data = res?.data?.data;
        const device = await currentDevice();
        const isLogin = device.os == data?.lastLogin?.os && device?.device == data?.lastLogin?.device;
        if (isLogin) {
          await storeUserRole(data?.role);
          dispatch(setUserDataInRedux(data));
        } else {
          onLoginExpire(false);
        }
      }
    } catch (error) {
      onLoginExpire(false);
      console.log(error);
    }
  }

  const onLoginExpire = async (press) => {
    Alert.alert(
      'Session Expired',
      'Your session has expired. Please login again.',
      press && [
        { text: 'OK', onPress: () => { navigationToReset(navigationRef.current, NavigationScreens.LoginScreen); } }
      ]
    );
    await removeAuthID();
    await removeUserRole();
    dispatch(removeAuthIDFromRedux());
    dispatch(removeUserDataFromRedux());
  }

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <NavigationHandler />
      </NavigationContainer>
      <ConnectionIndicatior connected={socketConnected} />
    </>
  )
}

export default App