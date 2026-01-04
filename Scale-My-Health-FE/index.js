/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import Store from './src/redux/Store';
import { Provider } from 'react-redux';
import ToastConfig from './src/utils/ToastConfig';
import { SocketProvider } from './src/components/socket/SocketContext';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const MyApp = () => {
    return (
        <SocketProvider>
            <Provider store={Store}>
                <App />
            </Provider>
            <ToastConfig />
        </SocketProvider>
    )
}

AppRegistry.registerComponent(appName, () => MyApp);