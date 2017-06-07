/**
 * Created by Ramirez on 4/20/2017.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
} from 'react-native';

let Pingpp = require('pingpp-react-native');


export default class TestPing extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("alipay")}>支付宝</Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("wx")}>微信支付</Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("upacp")}>银联支付</Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("qpay")}>QQ钱包</Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("bfb_wap")}>百付宝wap</Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("jdpay_wap")}>京东支付wap</Text>
                <Text style={styles.payBtn} onPress={() => Pingpp.setDebug(true)}>开启调试</Text>
            </View>
        );
    }

    textOnclick(channel) {
        let info = {
            "order_no": "2017050317535653561493805236912",
            "time_expire": 1493891643,
            "metadata": {
                "charge_type": "appointment",
                "order_type": "appointment"
            },
            "livemode": false,
            "subject": "2017-06-30 14:00 预约 李医生(工号002)医生",
            "channel": "alipay",
            "description": null,
            "body": "2017-06-30 14:00 预约 李医生(工号002)医生",
            "failure_msg": null,
            "refunds": {
                "object": "list",
                "url": "/v1/charges/ch_9Senn9Oqz9y10aHmX9Oy5OmL/refunds",
                "has_more": false,
                "data": []
            },
            "amount_refunded": 0,
            "time_settle": null,
            "time_paid": null,
            "credential": {
                "object": "credential",
                "alipay": {
                    "orderInfo": "_input_charset=\"utf-8\"&body=\"2017-06-30 14:00 预约 李医生(工号002)医生\"&it_b_pay=\"2017-05-04 17:54:03\"&notify_url=\"https%3A%2F%2Fnotify.pingxx.com%2Fnotify%2Fcharges%2Fch_9Senn9Oqz9y10aHmX9Oy5OmL\"&out_trade_no=\"2017050317535653561493805236912\"&partner=\"2008476213973251\"&payment_type=\"1\"&seller_id=\"2008476213973251\"&service=\"mobile.securitypay.pay\"&subject=\"2017-06-30 14:00 预约 李医生(工号002)医生\"&total_fee=\"0.01\"&sign=\"NTRDT1MwOEN5alhQcTFHQ0M4Q21iVFMw\"&sign_type=\"RSA\""
                }
            },
            "extra": {},
            "refunded": false,
            "client_ip": "127.0.0.1",
            "currency": "cny",
            "id": "ch_9Senn9Oqz9y10aHmX9Oy5OmL",
            "app": "app_azbD4Kqz9mrHWL0m",
            "amount": 1,
            "failure_code": null,
            "created": 1493805243,
            "amount_settle": 1,
            "paid": false,
            "transaction_no": null,
            "object": "charge"
        };

        Pingpp.createPayment(JSON.stringify(info), function (result) {
            //JSON.parse(result);
            console.log(result);
            ToastAndroid.show("react-result:" + result, ToastAndroid.SHORT);
        });
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    payBtn: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor: "#DEDEDE",
        padding: 5
    },
});