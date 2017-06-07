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
    TouchableOpacity,
    ScrollView,
    TextInput,
    Picker,
    ActivityIndicator
} from 'react-native';
import ImagePicker  from 'react-native-image-picker';
import {NavigationActions} from 'react-navigation';
import ProgressBar from './plugIn/ProgressBar'
import Warning from './plugIn/Warning'
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

let photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let source;
export default class DiseaseDescriptionScene extends React.Component {
    static navigationOptions = {
        title: '病情描述'
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            token: '',
            normal_user_id: 805,
            doc_name: props.navigation.state.params.doc_name,
            doctor_id: props.navigation.state.params.doctor_id,
            doctor_work_address_id: props.navigation.state.params.address_id,
            selectDate: props.navigation.state.params.selectDate,
            selectTime: props.navigation.state.params.selectTime,
            time_type: props.navigation.state.params.time_type,
            patient_id: 1,
            appointment_time: '',
            patient_condition: '',
            user_patient_list: [{name: '请选择联系人..'}],
            patient_condition_image: '',
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
                let me = this;
                let myparams = {
                    'token': this.state.token,
                    'normal_user_id': this.state.normal_user_id,
                };
                console.log(myparams);
                NetUitl.get(API.APIList.user_patient_list, myparams, function (res) {
                    //下面的就是请求来的数据
                    console.log(res);
                    me.setState({
                        user_patient_list: res.result,
                    });
                });
            });
        });
        this.setState({appointment_time: this.state.selectDate + ' ' + this.state.selectTime}, () => {
            console.log(this.state);
        });

    }

    componentDidMount() {
        console.log(this.state);
        // let me = this;
        // let myparams = {
        //     'token': this.state.token,
        //     'normal_user_id': this.state.normal_user_id,
        // };
        // console.log(myparams);
        // NetUitl.get(API.APIList.user_patient_list, myparams, function (res) {
        //     //下面的就是请求来的数据
        //     console.log(res);
        //     me.setState({
        //         user_patient_list: res.result,
        //     });
        // });
    }

    _onPersonalInfoButtonClick() {
        this.setState({
            circleSize: 'large'
        });
        console.log(this.state);
        let me = this;
        let myparams = {
            token: this.state.token,
            normal_user_id: this.state.normal_user_id,
            doctor_id: this.state.doctor_id,
            doctor_work_address_id: this.state.doctor_work_address_id,
            time_type: this.state.time_type,
            patient_id: this.state.patient_id,
            appointment_time: this.state.appointment_time,
            patient_condition: this.state.patient_condition
        };
        console.log(myparams);
        NetUitl.img(API.APIList.appointment_order_create, myparams, this.state.patient_condition_image, function (res) {
            me.setState({
                circleSize: 0
            });
            console.log(res);
            if (res.success === true) {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'PayScene',
                    params: {order_info: res.result},
                });
                me.props.navigation.dispatch(navigateAction)
            } else {
                Alert.alert(res.error.message);
            }
        });
        // const navigate = this.props.navigation.navigate;
        // navigate('PayScene');
    }

    openMycamera = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('response' + response);
            if (response.didCancel) {
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                source = {uri: response.uri};
                console.log(source);
                this.setState({patient_condition_image: source.uri}, () => {
                    console.log(this.state);
                });
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        })
    };

    render() {
        return (
            <ScrollView style={styles.page}>
                <ProgressBar imgOne={require('../img/right.png')}
                             imgTwo={require('../img/circle.png')}
                             imgThree={require('../img/circle.png')}
                             imgFour={require('../img/circle.png')}/>
                <View style={styles.submitApplications}>
                    <Text style={styles.doctor}>{this.state.doc_name}&nbsp;{this.state.appointment_time}</Text>
                    <Text style={styles.submitApplicationsTitle}>病情描述</Text>
                    <TextInput multiline={true} underlineColorAndroid="transparent"
                               style={styles.submitApplicationsInput}
                               placeholder="请描述你的病情"
                               onChangeText={(patient_condition) => this.setState({patient_condition})}
                               value={this.state.patient_condition}/>
                    <Text style={styles.submitApplicationsTitle}>病情图片</Text>
                    <TouchableOpacity onPress={() => this.openMycamera()}>
                        <Text style={styles.submitUpImg}>
                            上传图片
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.submitImgStyle}>
                        <Image source={source} style={styles.submitImg}/>
                    </View>
                    <Text style={styles.submitApplicationsTitle}>就诊人</Text>
                    <View style={styles.patient}>
                        <Picker selectedValue={this.state.patient_id}
                                onValueChange={(patient_id) => this.setState({patient_id: patient_id}, () => {
                                        console.log(this.state.patient_id);
                                    }
                                )}>
                            {
                                this.state.user_patient_list.map(function (item) {
                                    return (
                                        <Picker.Item label={item.name} value={item.id} key={item.id}/>
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
                <ActivityIndicator animating={this.state.isLoging} size={this.state.circleSize}/>
                <View style={styles.submit}>
                    <Button color="#09a9ef" title="提交预约单" onPress={this._onPersonalInfoButtonClick.bind(this)}/>
                </View>
                <Warning text="医生确认后请在服务历史中查看就诊时间，就诊地点，和门诊预约骂。" textTwo="此费用为您的门诊预约费用，线下就诊需另行支付挂号费用"/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    submitApplications: {
        margin: 15,
    },
    doctor: {
        color: '#050505',
        padding: 5,
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    submitApplicationsTitle: {
        padding: 5,
        color: '#050505',
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    submitApplicationsInput: {
        marginTop: -1,
        height: 80,
        padding: 10,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    submitUpImg: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    submitImg: {
        width: 110,
        height: 110
    },
    submitImgStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    patient: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    submit: {
        borderWidth: 1,
        borderColor: '#dddddd',
        padding: 17
    }
});