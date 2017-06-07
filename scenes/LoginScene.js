/**
 * Created by Ramirez on 4/20/2017.
 */

import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Alert,
    TextInput,
    Text,
    Button,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableNativeFeedback
} from 'react-native'
import {Sae} from 'react-native-textinput-effects';
import {Kaede} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {NavigationActions} from 'react-navigation'
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class LoginScene extends React.Component {
    static navigationOptions = {
        title: '登录', headerVisible: false
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: '15029972629',
            password: '111111',
            isLoging: true,
            circleSize: 0
        };
    }

    _onLoginButtonClick() {
        console.log(this.state.phone);
        this.setState({
            circleSize: 'large'
        });
        let params = {
            'username': this.state.phone,
            'password': this.state.password
        };
        let me = this;
        NetUitl.post(API.APIList.authenticate, params, function (responseData) {
            //下面的就是请求来的数据
            console.log(responseData);
            me.setState({
                circleSize: 0
            });
            if (responseData.success === true) {
                console.log('登录成功');
                AsyncStorage.setItem('normal_user_id', JSON.stringify(responseData.result.id)).then(
                    () => {   //成功的操作
                        // console.log("normal_user_id保存成功!");
                    },
                );
                AsyncStorage.setItem('mytoken', responseData.result.token).then(
                    () => {   //成功的操作
                        // console.log("token保存成功!");
                    },
                );
                const navigate = me.props.navigation.navigate;
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'BottomNavigation'
                        })
                    ],
                });
                me.props.navigation.dispatch(resetAction)
            } else {
                Alert.alert(responseData.error.message);
            }
        })
        // fetch('http://www.bigbug.tech:8080/hospital-appointment-api/api/normal_user/authenticate.json', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: 'username=' + this.state.phone + '&password=' + this.state.password
        // }).then((response) => {
        //     console.log(response);
        //     return response.json()
        // }).then((responseData) => {
        //     console.log(responseData);
        //     this.setState({
        //         circleSize: 0
        //     });
        //     if (responseData.success === true) {
        //         console.log('登录成功');
        //
        //         AsyncStorage.setItem('normal_user_id', JSON.stringify(responseData.result.id)).then(
        //             () => {   //成功的操作
        //                 console.log("normal_user_id保存成功!");
        //             },
        //         );
        //         AsyncStorage.setItem('mytoken', responseData.result.token).then(
        //             () => {   //成功的操作
        //                 console.log("token保存成功!");
        //             },
        //         );
        //         const navigate = this.props.navigation.navigate;
        //         const resetAction = NavigationActions.reset({
        //             index: 0,
        //             actions: [
        //                 NavigationActions.navigate({
        //                     routeName: 'BottomNavigation'
        //                 })
        //             ],
        //         });
        //         // -----------------------
        //         // const navigateAction = NavigationActions.navigate({
        //         //     routeName: 'BottomNavigation',
        //         //     params: {mytoken: responseData.result.token},
        //         // });
        //         // this.props.navigation.dispatch(navigateAction);
        //         this.props.navigation.dispatch(resetAction)
        //
        //     } else {
        //         Alert.alert(responseData.error.message);
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });


    }

    _onTestButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('FamilyContact');
    }

    _onResetPWButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('ResetPasswordScene');
    }

    _onSignUpButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('SignUpScene');
    }

    _onAierClinicButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('ClinicLocation');
    }

    _onClinicIntroButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('PersonalInfo');
    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView>
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
                            inputStyle={{color: '#444444'}}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType='phone-pad'
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                        />
                        <Sae
                            label={'密码'}
                            iconClass={FontAwesomeIcon}
                            iconName={'lock'}
                            iconColor={'#cccccc'}
                            inputStyle={{color: '#444444'}}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                        <TouchableNativeFeedback onPress={this._onLoginButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.buttonLogin}>
                                <Text>登录</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <ActivityIndicator animating={this.state.isLoging} size={this.state.circleSize}/>

                        <View style={styles.row}>
                            <Text onPress={this._onResetPWButtonClick.bind(this)}>忘记密码</Text>
                            <Text onPress={this._onSignUpButtonClick.bind(this)}>注册</Text>
                        </View>
                    </View>
                </ScrollView>
                <View  style={styles.backgroundImg}>
                <Image style={styles.backgroundImage}
                       source={require('../img/login_bg.png')}
                />
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60
    },
    backgroundImg:{
        flex:1,
    },
    backgroundImage: {
        width: '100%',
    },
});