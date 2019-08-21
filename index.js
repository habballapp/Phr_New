import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
import App from './src/navigator/navigator';

YellowBox.ignoreWarnings(['ViewPagerAndroid']);
YellowBox.ignoreWarnings(['Async Storage']);

AppRegistry.registerComponent(appName, () => App);
