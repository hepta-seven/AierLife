/**
 * Created by Ramirez on 4/20/2017.
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Text,
    Button,
    Image,
    TouchableNativeFeedback,
    ActivityIndicator
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class ResetPasswordScene extends React.Component {
    static navigationOptions = {
        title: '重置密码',
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: '15029972629',
            password: '111111',
            sms_code: '',
            isLoging: true,
            circleSize: 0
        };
    }

    _onLoginButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('LoginScene');
    }

    _onGetCodeButtonClick() {
        let params = {'phone': this.state.phone};
        NetUitl.get(API.APIList.send_change_password_code, params, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            if (res.success === true) {
                Alert.alert('发送成功');
            } else {
                Alert.alert(res.error.message);
            }
        })
        // fetch('http://www.bigbug.tech:8080/hospital-appointment-api/api/sms/send_change_password_code.json?phone=' + this.state.phone, {
        //     method: 'GET',
        // }).then((response) => {
        //     console.log(response);
        //     return response.json()
        // }).then((responseData) => {
        //     console.log(responseData);
        //     this.setState({
        //         circleSize: 0
        //     });
        //     if (responseData.success === true) {
        //         console.log('发送成功');
        //     } else {
        //         Alert.alert(responseData.error.message);
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });
    }

    _onResetPWButtonClick() {
        let params = {
            'username': this.state.phone,
            'password': this.state.password,
            'sms_code': this.state.sms_code
        };
        NetUitl.post(API.APIList.change_password, params, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            Alert.alert('修改成功');
        })
    }


    _onSignUpButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('SignUpScene');
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.wholePage}>
                    <View style={styles.imgView}><Image style={styles.logoImg}
                                                        source={require('../img/logo.png')}/></View>
                    <Sae
                        label={'手机号'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={'#cccccc'}
                        inputStyle={{color: '#91627b'}}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                    />
                    <View style={styles.getCodeInput}>
                        <Sae style={styles.codeStyle}
                             label={'请输入验证码'}
                             iconClass={FontAwesomeIcon}
                             iconName={'key'}
                             iconColor={'#cccccc'}
                             inputStyle={{color: '#91627b'}}
                            // TextInput props
                             autoCapitalize={'none'}
                             autoCorrect={false}
                             onChangeText={(sms_code) => this.setState({sms_code})}
                             value={this.state.sms_code}
                        />
                        <TouchableNativeFeedback onPress={this._onGetCodeButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.buttonLogin}>
                                <Text>获取验证码</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <ActivityIndicator animating={this.state.isLoging} size={this.state.circleSize}/>
                    <Sae
                        label={'密码'}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={'#cccccc'}
                        inputStyle={{color: '#91627b'}}
                        secureTextEntry={true}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <TouchableNativeFeedback onPress={this._onResetPWButtonClick.bind(this)}
                                             background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.buttonLogin}>
                            <Text>重置</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this._onLoginButtonClick.bind(this)}
                                             background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.buttonLogin}>
                            <Text>取消</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    wholePage: {
        padding: 34
    },
    imgView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logoImg: {
        width: 65,
        height: 65,
    },
    inputTitle: {
        color: '#ffffff'
    },
    input: {
        height: 44
    },
    buttonLogin: {
        marginTop: 22,
        borderWidth: 1,
        height: 45,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
});