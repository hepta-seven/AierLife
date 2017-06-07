/**
 * Created by 七七 on 2017/4/21.
 */
import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableNativeFeedback
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {TabNavigator} from "react-navigation";
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class MyCenter extends React.Component {
    static navigationOptions = {
        title: '个人中心'
    };

    constructor(props) {
        super(props);
        this.state = {
            mytoken: '',
            normal_user_id: '',
            name: '',
            username: '',
        };
    };

    componentDidMount() {
        AsyncStorage.getItem('normal_user_id', (err, result) => {
            let me = this;
            this.setState({normal_user_id: result}, () => {
            });
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            let me = this;
            this.setState({mytoken: result}, () => {
                console.log(this);
                let myparams = {
                    'token': this.state.mytoken,
                    'normal_user_id': this.state.normal_user_id,
                };
                NetUitl.get(API.APIList.normal_user_info, myparams, function (res) {
                    //下面的就是请求来的数据
                    console.log(res);
                    me.setState({
                        name: res.result.name,
                        username: res.result.username
                    });
                });
            });
        });
    }

    _onlogOutButtonClick() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'LoginScene'})
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }

    _onPersonalInfoButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('PersonalInfo');
    }

    _onResetPasswordSceneButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('ResetPasswordScene');
    }

    _onOrderButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('MyOrderScene');
    }

    _onFamilyContactButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('FamilyContact');
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.meMessage}>
                    <View style={styles.meMessageName}>
                        <Text style={styles.meMessageNameText}>{this.state.name}</Text>
                    </View>
                    <View style={styles.meMessagePhone}>
                        <Image style={styles.labelImg} source={require('../img/icon_phone.png')}/>
                        <Text style={styles.meMessagePhoneText}>{this.state.username}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.meLabel}>
                        <TouchableNativeFeedback onPress={this._onPersonalInfoButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.meLabelStyle}>
                                <Image style={styles.labelImg} source={require('../img/icon_edit.png')}/>
                                <Text style={styles.meLabelStyleText}>编辑个人信息</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._onResetPasswordSceneButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.meLabelStyle}>
                                <Image style={styles.labelImg} source={require('../img/icon_password_red.png')}/>
                                <Text style={styles.meLabelStyleText}>修改密码</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View>
                    <View style={styles.meLabel}>
                        <TouchableNativeFeedback onPress={this._onOrderButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.meLabelStyle}>
                                <Image style={styles.labelImg} source={require('../img/icon_appointment.png')}/>
                                <Text style={styles.meLabelStyleText}>我的预约</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._onFamilyContactButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.meLabelStyle}>
                                <Image style={styles.labelImg} source={require('../img/icon_people.png')}/>
                                <Text style={styles.meLabelStyleText}>家庭联系人</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View>
                    <View style={styles.meLabel}>
                        <TouchableNativeFeedback onPress={this._onFamilyContactButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.meLabelStyle}>
                                <Image style={styles.labelImg} source={require('../img/icon_message.png')}/>
                                <Text style={styles.meLabelStyleText}>意见反馈</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._onFamilyContactButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.meLabelStyle}>
                                <Image style={styles.labelImg} source={require('../img/icon_info.png')}/>
                                <Text style={styles.meLabelStyleText}>关于</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <TouchableNativeFeedback onPress={this._onlogOutButtonClick.bind(this)}
                                         background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.buttonLogin}>
                        <Text>退出登录</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    meMessage: {
        height: 100,
        marginTop: 3,
        marginBottom: 9,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    meMessageName: {
        marginTop: 10,
        paddingLeft: 10
    },
    meMessageNameText: {
        color: '#444444',
        fontWeight: 'bold'
    },
    meMessagePhone: {
        marginTop: 15,
        paddingLeft: 6,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    meMessagePhoneText: {
        paddingLeft: 5,
        paddingTop: 5
    },
    labelImg: {
        width: 32,
        height: 32
    },
    buttonLogin: {
        marginTop: 5,
        marginHorizontal: 22,
        borderWidth: 1,
        height: 45,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
    meLabel: {
        height: 120,
        marginTop: 3,
        marginBottom: 9,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    meLabelStyle: {
        width: '100%',
        height: 60,
        paddingLeft: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    meLabelStyleText: {
        paddingLeft: 5,
        paddingTop: 5
    },
});