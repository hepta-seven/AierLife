/**
 * Created by 七七 on 2017/4/24.
 */
import React from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    StyleSheet,
    View,
    Alert,
    Text,
    Image,
    Button,
    ToastAndroid
} from 'react-native'
import ChannelOfDisbursement from './plugIn/ChannelOfDisbursement'
import ProgressBar from './plugIn/ProgressBar'
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

let Pingpp = require('pingpp-react-native');

export default class PayScene extends React.Component {
    static navigationOptions = {
        title: '支付'
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            token: '',
            order_id: '',
            normal_user_id: 805,
            doctor_name: '',
            time_type: 1,
            doctor_hostital: '',
            appointment_address: '',
            appointment_time: '',
            price: '',
            doctor_department: '',
            patient_condition: '',
            pay_type: 1,
            isLoging: true,
            circleSize: 0
        };
    };

    componentWillMount() {
        AsyncStorage.getItem('normal_user_id', (err, result) => {
            console.log(result);
            this.setState({normal_user_id: result}, () => {
            });
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            this.setState({token: result}, () => {
                console.log(this.state);
            });
        });
        this.setState({
            order_id: this.props.navigation.state.params.order_info.id,
            doctor_name: this.props.navigation.state.params.order_info.doctor_name,
            appointment_address: this.props.navigation.state.params.order_info.appointment_address,
            appointment_time: this.props.navigation.state.params.order_info.appointment_time,
            price: this.props.navigation.state.params.order_info.price,
            patient_condition: this.props.navigation.state.params.order_info.patient_condition,
            doctor_department: this.props.navigation.state.params.order_info.doctor_department,
            doctor_hostital: this.props.navigation.state.params.order_info.doctor_hostital,
            time_type: this.props.navigation.state.params.order_info.time_type
        }, () => {
            console.log(this.state);
        });
    }

    _onPayClickButton() {
        this.setState({
            circleSize: 'large'
        });
        let params = {
            'order_id': this.state.order_id,
            'pay_type': this.state.pay_type,
            'token': this.state.token
        };
        let me = this;
        NetUitl.post(API.APIList.charge_appointment_pay, params, function (responseData) {
            //下面的就是请求来的数据
            console.log(responseData);
            Pingpp.createPayment(JSON.stringify(responseData.result), function (result) {
                //JSON.parse(result);
                console.log(JSON.parse(result));
                me.setState({
                    circleSize: 0
                });
                if (JSON.parse(result).pay_result === 'success') {
                    ToastAndroid.show("react-result:" + result, ToastAndroid.SHORT);
                    // const navigate = me.props.navigation.navigate;
                    // const resetAction = NavigationActions.reset({
                    //     index: 0,
                    //     actions: [
                    //         NavigationActions.navigate({
                    //             routeName: 'BottomNavigation'
                    //         })
                    //     ],
                    // });
                    // me.props.navigation.dispatch(resetAction)
                } else {
                    Alert.alert(JSON.parse(result).error_msg);
                }
                // ToastAndroid.show("react-result:" + result, ToastAndroid.SHORT);

            });


        })
    }


    render() {
        return (
            <View style={styles.Page}>
                <ProgressBar imgOne={require('../img/circle.png')}
                             imgTwo={require('../img/right.png')}
                             imgThree={require('../img/circle.png')}
                             imgFour={require('../img/circle.png')}/>
                <View>
                    <View style={styles.doctor}>
                        <Text
                            style={styles.doctorText}>{this.state.doctor_name}-{this.state.doctor_department}{this.state.time_type === 1 ? '普通' : this.state.time_type === 2 ? '加急' : this.state.time_type === 3 ? '实时' : '不可预约'}门诊预约</Text>
                        <Text style={styles.doctorMoney}>{this.state.price}元</Text>
                    </View>
                    <Text style={styles.doctorMessage}>预约时间：{this.state.appointment_time}</Text>
                    <Text style={styles.doctorMessage}>就诊地址：{this.state.appointment_address}</Text>
                    <Text style={styles.doctorMessage}>病情描述：{this.state.patient_condition}</Text>
                </View>
                <View>
                    <Text style={styles.PayMode}>请选择支付方式</Text>
                </View>
                <ChannelOfDisbursement Img={require('../img/weixinzhifu.png')} name="微信支付"
                                       versions="推荐安装微信5.0及以上版本用户使用"/>
                <ChannelOfDisbursement Img={require('../img/zhifubao.png')} name="支付宝支付" versions="推荐安装支付宝客户端的用户使用"/>
                <ActivityIndicator animating={this.state.isLoging} size={this.state.circleSize}/>
                <View style={styles.PayButton}>
                    <Button title="确认支付" onPress={this._onPayClickButton.bind(this)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    doctor: {
        marginVertical: -1,
        borderWidth: 1,
        borderColor: '#dddddd',
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    doctorText: {
        fontSize: 16,
        color: '#010101'
    },
    doctorMoney: {
        marginTop: 5,
        color: '#ff0000'
    },
    doctorMessage: {
        marginVertical: -1,
        borderWidth: 1,
        borderColor: '#dddddd',
        padding: 12,
    },
    PayMode: {
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: '#f5f5f5',
        fontSize: 20,
        fontWeight: '800',
        color: '#010101',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    PayButton: {
        marginVertical: 10,
        padding: 10
    }
});