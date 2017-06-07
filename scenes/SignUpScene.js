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
    TouchableNativeFeedback
} from 'react-native';
import CheckBox from 'react-native-check-box'
import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class ResetPasswordScene extends React.Component {
    static navigationOptions = {
        title: '注册',
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: '18049061619',
            password: '123456',
            sms_code: '1111',
            invitation_code: '62794377',
            isChecked: true,
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

        NetUitl.get(API.APIList.send_register_code, params, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            Alert.alert('发送成功');
        });

    }

    _onSignUpButtonClick() {
        let params = {
            'username': this.state.phone,
            'password': this.state.password,
            'sms_code': this.state.sms_code,
            'invitation_code': this.state.invitation_code
        };
        console.log(params);
        NetUitl.post(API.APIList.register, params, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            if (res.success === true) {
                Alert.alert('注册成功');
                const navigate = this.props.navigation.navigate;
                navigate('SignUpScene');
            } else {
                Alert.alert(res.error.message);
            }
        })
    }

    _onCheckBox() {
        this.setState({isChecked: !this.state.isChecked})
    }

    render() {
        data = true;
        return (
            <View style={styles.page}>
                <View style={styles.wholePage}>
                    <View style={styles.imgView}>
                        <Image style={styles.logoImg}
                               source={require('../img/logo.png')}
                        />
                    </View>
                    <Sae
                        label={'手机号'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={'#cccccc'}
                        inputStyle={{color: '#91627b'}}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                    />
                    <Sae
                        label={'请输入验证码'}
                        iconClass={FontAwesomeIcon}
                        iconName={'key'}
                        iconColor={'#cccccc'}
                        inputStyle={{color: '#91627b'}}
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
                    <Sae
                        label={'密码'}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={'#cccccc'}
                        inputStyle={{color: '#91627b'}}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <Sae
                        label={'请输入邀请码'}
                        iconClass={FontAwesomeIcon}
                        iconName={'envelope'}
                        iconColor={'#cccccc'}
                        inputStyle={{color: '#91627b'}}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(invitation_code) => this.setState({invitation_code})}
                        value={this.state.invitation_code}
                    />
                    <View style={styles.check}>
                        <CheckBox onClick={this._onCheckBox.bind(this)} isChecked={this.state.isChecked}/>
                        <Text>同意爱尔生活用户注册协议</Text>
                    </View>
                    <TouchableNativeFeedback onPress={this._onSignUpButtonClick.bind(this)}
                                             background={TouchableNativeFeedback.SelectableBackground()}
                                             disabled={!this.state.isChecked && this.state.phone}>
                        <View style={styles.buttonLogin}>
                            <Text>注册</Text>
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
    check: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});