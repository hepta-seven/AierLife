/**
 * Created by 陈腾飞 on 2017/4/24.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {NavigationActions} from 'react-navigation';
export default class Urgent extends React.Component {
    render() {
        return (
            <View style={styles.paged}>
                <View style={styles.urgent}>
                    <View style={styles.urgentText}>
                        <Text style={styles.urgentOrder}>加急预约</Text>
                        <Text style={styles.urgentMoney}>200元</Text>
                    </View>
                    <View style={styles.favorableText}>
                        <Text style={styles.favorableOrder}>提前预约享受更多优惠！</Text>
                        <Text style={styles.favorableMoney}>0.01元</Text>
                    </View>
                </View>
                <View style={styles.submit}>
                    <TouchableOpacity onPress={this.props.onPress}
                                      >
                        <Text style={styles.submitText}>提交预约</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    paged: {
        flexDirection: 'row',
    },
    urgent: {
        borderWidth: 1,
        borderColor: '#dddddd',
        width: '75%',
        height: 60,
    },
    urgentText: {
        flexDirection: 'row',
        paddingHorizontal: 11,
        paddingTop: 8
    },
    urgentOrder: {
        color: '#444444',
        fontSize: 15

    },
    urgentMoney: {
        paddingLeft: 145,
        fontSize: 15,
        textDecorationLine: 'line-through'
    },
    favorableText: {
        flexDirection: 'row',
        paddingHorizontal: 11,
        paddingTop: 8,
        paddingBottom: 8,
    },
    favorableOrder: {
        fontSize: 15

    },
    favorableMoney: {
        color: '#ff3b30',
        paddingLeft: 38,
        fontSize: 16
    },
    submit: {
        backgroundColor: '#387ef5',
        width: '25%',
        height: 60
    },
    submitText: {
        paddingTop: 22,
        textAlign:'center',
        color: '#ffffff'
    }
})
