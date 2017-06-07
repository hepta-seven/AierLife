/**
 * Created by 七七 on 2017/4/21.
 */
/**
 * Created by Ramirez on 4/20/2017.
 */

import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
} from 'react-native';
import {TabNavigator} from "react-navigation";
import NorAffirm from './plugIn/NorAffirm';
import PressAffirm from './plugIn/PressAffirm';
import WaitPay from './plugIn/WaitPay';
import WaitSubsequentVisit from './plugIn/WaitSubsequentVisit';
export default class HomeScene extends React.Component {
    static navigationOptions = {
        title: '我的服务'
    };

    componentDidMount() {
        AsyncStorage.getItem('mytoken', (err, result) => {
            console.log(result);
        });
    }

    render() {
        const MainScreenNavigator = TabNavigator({
            已确认: {screen: PressAffirm},
            待确认: {screen: NorAffirm},
            待复诊: {screen: WaitSubsequentVisit},
            待支付: {screen: WaitPay},
        }, {
            tabBarOptions: {
                activeTintColor: '#06a9ef',
                inactiveTintColor: 'gray',
                style: {
                    backgroundColor: '#ffffff',
                    height: 50,
                }
            },
        });
        return (
            <MainScreenNavigator/>
        );
    }
}

const styles = StyleSheet.create({});