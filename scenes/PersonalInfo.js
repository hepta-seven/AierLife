/**
 * Created by 七七 on 2017/4/24.
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
    ScrollView,
} from 'react-native'
import {NavigationActions} from 'react-navigation';
import Warning from './plugIn/Warning';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class PersonalInfo extends React.Component {
    static navigationOptions = {
        title: '个人信息',
    };

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            id: '',
            name: '',
            identity_card: '',
            gender: '',
            address: '',
        };
    };

    componentWillMount() {
        AsyncStorage.getItem('normal_user_id', (err, result) => {
            let me = this;
            this.setState({id: result}, () => {
            });
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            let me = this;
            this.setState({token: result}, () => {
                console.log(this);
                let myparams = {
                    'token': this.state.token,
                    'normal_user_id': this.state.id,
                };
                NetUitl.get(API.APIList.normal_user_info, myparams, function (res) {
                    //下面的就是请求来的数据
                    console.log(res);
                    me.setState({
                        name: res.result.name,
                        identity_card: res.result.identity_card,
                        username: res.result.username,
                        gender: res.result.gender,
                        address: res.result.address,
                    });

                });
            });
        });
    }

    _onSaveButtonClick() {
        console.log(this);
        let params = this.state;
        let me = this;
        NetUitl.post(API.APIList.update_user_info, params, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            Alert.alert('修改成功');
            const navigate = me.props.navigation.navigate;
            navigate('FamilyContact');
        });
        // fetch('http://www.bigbug.tech:8080/hospital-appointment-api/api/normal_user/update.json', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: 'token=' + this.state.token + '&id=805&name=RamirezNi&identity_card=10086&gender=1&address=新马泰'
        // }).then((response) => {
        //     console.log(response);
        //     return response.json()
        // }).then((responseData) => {
        //     console.log(responseData);
        // }).catch((error) => {
        //     console.error(error);
        // });

    }


    onSelect(index, value) {
        this.setState({gender: value + 1}, () => {
            console.log(this.state)
        });
    }

    render() {
        return (
            <View style={styles.Page}>
                <View style={styles.page}>
                    <View style={styles.messageStyle}>
                        <Text style={styles.messageStyleTitle}>姓名</Text>
                        <TextInput style={styles.messageStyleInput} placeholder="请输入姓名"
                                   onChangeText={(text) => {
                                       this.setState({name: text})
                                   }}
                                   value={this.state.name}/>
                    </View>
                    <View style={styles.messageStyle}>
                        <Text style={styles.messageStyleTitle}>身份证</Text>
                        <TextInput style={styles.messageStyleInput} placeholder="请输入身份证号码"
                                   onChangeText={(identity_card) => {
                                       this.setState({
                                           identity_card: identity_card
                                       })
                                   }}
                                   value={this.state.identity_card}/>
                    </View>
                    <View style={styles.messageStyle}>
                        <Text style={styles.messageStyleTitle}>性别</Text>
                        <RadioGroup style={styles.messageStylePlugin}
                                    onSelect={(index, value) => this.onSelect(index, value)}
                                    selectedIndex={this.state.gender - 1}>
                            <RadioButton value={0}>
                                <Text>男</Text>
                            </RadioButton>
                            <RadioButton value={1}>
                                <Text>女</Text>
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    {/*<View style={styles.messageStyle}>*/}
                    {/*<Text style={styles.messageStyleTitle}>联系电话</Text>*/}
                    {/*<TextInput style={styles.messageStyleInput} placeholder="请输入联系电话"*/}
                    {/*onChangeText={(username) => {*/}
                    {/*this.setState({*/}
                    {/*username: username*/}

                    {/*})*/}
                    {/*}}*/}
                    {/*value={this.state.username}*/}
                    {/*editable={false}/>*/}
                    {/*</View>*/}
                    <View style={styles.messageStyle}>
                        <Text style={styles.messageStyleTitle}>地址</Text>
                        <TextInput style={styles.messageStyleInput} placeholder="请输入地址"
                                   onChangeText={(address) => {
                                       this.setState({
                                           address: address

                                       })
                                   }}
                                   value={this.state.address}/>
                    </View>
                </View>
                <Warning text="请您正确填写个人信息，以便为您带来更优质的服务！"/>
                <View style={styles.buttonStyle}>
                    <Button onPress={this._onSaveButtonClick.bind(this)} title='保存'/>
                </View>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        Page: {
            flex: 1,
            paddingVertical: 10,
            backgroundColor: '#f8f8f8'
        },
        buttonStyle: {
            marginVertical: 15,
            marginHorizontal: 10,
        },
        page: {
            paddingHorizontal: 16,
            marginTop: 5,
            backgroundColor: '#ffffff'
        },
        messageStyle: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        messageStyleTitle: {
            paddingTop: 20,
            width: '20%'
        },
        messageStyleInput: {
            paddingTop: 15,
            width: '80%',
        },
        messageStylePlugin: {
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-start',
        }
    });