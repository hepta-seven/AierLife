/**
 * Created by 陈腾飞 on 2017/4/23.
 */
//医生详情页面资料组件
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import {NavigationActions} from 'react-navigation';


export default class Subscribe extends React.Component {
    static navigationOptions = {
        title: '资料'
    };

    constructor() {
        super();
        console.log(this);

    };

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.materText}>预约</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10,
        paddingRight: 30,
        height: 60
    },
    materText: {
        fontSize: 14,
        color: '#444444'
    }
});