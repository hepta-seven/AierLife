/**
 * Created by 陈腾飞 on 2017/4/23.
 */
//医生详情页面预约组件
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import {NavigationActions} from 'react-navigation';


export default class Material extends React.Component {
    static navigationOptions = {
        title: '资料'
    };

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.materText}>爱尔诊所后宰门诊室后宰门130号创之星大厦一单元122（中户）</Text>
                <View style={styles.wire}/>
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
    wire: {
        paddingTop: 1,
        backgroundColor: '#f0f0f0',
        height: 2,
    },
    materText: {
        fontSize: 14,
        color: '#444444'
    }
});