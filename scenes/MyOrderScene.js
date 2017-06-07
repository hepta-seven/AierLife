/**
 * Created by 七七 on 2017/4/22.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import {TabNavigator} from "react-navigation";
import OrderNorPay from './OrderNorPay'
import OrderPressPay from './OrderPressPay'
export default class MyOrderScene extends React.Component {
    static navigationOptions = {
        title: '我的预约'
    };

    render() {
        const MainScreenNavigator = TabNavigator({
            已确认: {screen: OrderNorPay},
            待确认: {screen: OrderPressPay},
        },{
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