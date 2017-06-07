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
} from 'react-native'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Warning from './plugIn/Warning';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class AddContact extends React.Component {
    static navigationOptions = {
        title: '添加联系人',
    };

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            id: '',
            name: '',
            phone: '',
            gender: 1,
            normal_user_id: '',
            address: '',
            identity_card: '',
        };
    };

    onSelect(index, value) {
        this.setState({gender: value + 1}, () => {
            console.log(this.state)
        });
    }

    componentDidMount() {
        AsyncStorage.getItem('normal_user_id', (err, result) => {
            let me = this;
            this.setState({normal_user_id: result}, () => {
            });
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            let me = this;
            this.setState({token: result}, () => {
                console.log(this);
            });
        });
    }


    onSaveButtonClick() {
        console.log(this);
        let me = this;
        let params = {
            'name': this.state.name,
            'phone': this.state.phone,
            'gender': this.state.gender,
            'normal_user_id': this.state.normal_user_id,
            'address': this.state.address,
            'identity_card': this.state.identity_card,
            'token': this.state.token
        };
        NetUitl.post(API.APIList.user_patient_add, params, function (responseData) {
            //下面的就是请求来的数据
            console.log(responseData);
            if (responseData.success === true) {
                Alert.alert('添加成功');
                const navigate = me.props.navigation.navigate;
                navigate('FamilyContact');
            } else {
                Alert.alert(responseData.error.message);
            }
        })
    }

    render() {
        return (
            <View style={styles.Page}>
                <View style={styles.page}>
                    <View style={styles.messageStyle}>
                        <Text style={styles.messageStyleTitle}>姓名</Text>
                        <TextInput style={styles.messageStyleInput} placeholder="请输入姓名" onChangeText={(text) => {
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
                    <View style={styles.messageStyle}>
                        <Text style={styles.messageStyleTitle}>联系电话</Text>
                        <TextInput style={styles.messageStyleInput} placeholder="请输入联系电话"
                                   onChangeText={(phone) => {
                                       this.setState({
                                           phone: phone

                                       })
                                   }}
                                   value={this.state.phone}/>
                    </View>
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
                <Warning text="请您正确填写联系人信息，以便为您带来更优质的服务！"/>
                <View style={styles.buttonStyle}>
                    <Button onPress={this.onSaveButtonClick.bind(this)} title='保存'/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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