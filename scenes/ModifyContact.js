/**
 * Created by 七七 on 2017/4/24.
 */
import React from 'react';
import {
    AsyncStorage,
    Alert,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    ScrollView,
} from 'react-native'
import {NavigationActions} from 'react-navigation';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Warning from './plugIn/Warning';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class ModifyContact extends React.Component {
    static navigationOptions = {
        title: '修改联系人',
    };

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            id: '',
            gender: '',
            identity_card: '',
            phone: '',
            address: ''
        };
    };

    componentWillMount() {
        AsyncStorage.getItem('mytoken', (err, result) => {
            let me = this;
            this.setState({token: result}, () => {
            });
        });
        const {params} = this.props.navigation.state;
        this.setState({
            data: params.contactInfo,
            id: params.contactInfo.id,
            gender: params.contactInfo.gender,
            identity_card: params.contactInfo.identity_card,
            name: params.contactInfo.name,
            address: params.contactInfo.address,
            phone: params.contactInfo.phone
        }, () => {
        });
    }

    _onSaveButtonClick() {
        let parmas = {
            token: this.state.token,
            id: this.state.id,
            gender: this.state.gender,
            identity_card: this.state.identity_card,
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone
        };
        console.log(parmas);
        let me = this;
        NetUitl.post(API.APIList.user_patient_update, parmas, function (responseData) {
            //下面的就是请求来的数据
            console.log(responseData);
            if (responseData.success === true) {
                Alert.alert('修改成功');
                const navigate = me.props.navigation.navigate;
                navigate('FamilyContact');
            } else {
                Alert.alert(responseData.error.message);
            }
        })
    }

    _onConfirmButtonClick() {
        Alert.alert(
            '确认删除吗?',
            '删除后将无法恢复!',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => {
                    let parmas = {
                        token: this.state.token,
                        patient_id: this.state.id,
                    };
                    console.log(parmas);
                    let me = this;
                    NetUitl.post(API.APIList.user_patient_remove, parmas, function (responseData) {
                        //下面的就是请求来的数据
                        console.log(responseData);
                        if (responseData.success === true) {
                            Alert.alert('删除成功');
                            const navigate = me.props.navigation.navigate;
                            navigate('FamilyContact');
                        } else {
                            Alert.alert(responseData.error.message);
                        }
                    })
                }
                },
            ],
            {cancelable: false}
        )
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
                        <TextInput style={styles.messageStyleInput} placeholder="请输入联系电话" onChangeText={(phone) => {
                            this.setState({phone: phone})
                        }} value={this.state.phone}/>
                    </View>
                    <View style={styles.messageStyle}>
                        <Text style={styles.messageStyleTitle}>地址</Text>
                        <TextInput style={styles.messageStyleInput} placeholder="请输入地址" onChangeText={(address) => {
                            this.setState({
                                address: address
                            })
                        }} value={this.state.address}/>
                    </View>
                </View>
                <Warning text="请您正确填写联系人信息，以便为您带来更优质的服务！"/>
                <View style={styles.buttonStyle}>
                    <Button onPress={this._onSaveButtonClick.bind(this)} title='保存'/>
                </View>
                <View style={styles.buttonStyle}>
                    <Button color='#ff0000' onPress={this._onConfirmButtonClick.bind(this)} title='删除'/>
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
        marginVertical: 10,
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