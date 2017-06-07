/**
 * Created by 陈腾飞 on 2017/4/23.
 */
//医生详情页面
import React from 'react';
import {
    AsyncStorage,
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    ScrollView
} from 'react-native';
import {TabNavigator} from "react-navigation";
import Subscribe from './plugIn/Subscribe';
import Material from './plugIn/Material';
import Date from './plugIn/DatePicker';
import Urgent from './plugIn/Urgent';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class ConsultingRoom extends React.Component {
    static navigationOptions = {
        title: '医生详情'
    };
    _doc_info = {};

    constructor(props) {
        super(props);
        this.state = {
            mytoken: '',
            address_id: '',
            doctor_id: '',
            doc_info: {}
        };
    };

    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.setState({
            doctor_id: params.doctor_id,
            address_id: params.address_id
        }, () => {
            console.log(this.state);
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            console.log(result);
            let me = this;
            this.setState({mytoken: result}, () => {
                console.log(this.state);
                let myparams = {
                    'token': this.state.mytoken,
                    'doctor_id': this.state.doctor_id,
                };
                console.log(myparams);
                NetUitl.get(API.APIList.doctor_show, myparams, function (res) {
                    console.log(res);
                    me.setState({doc_info: res.result}, () => {
                    });
                });
            });
        });
    }


    render() {
        const MainScreenNavigator = TabNavigator({
                预约: {screen: Date},
                资料: {screen: Material},
            }
            , {
                tabBarOptions: {
                    activeTintColor: '#06a9ef',
                    inactiveTintColor: 'gray',
                    style: {
                        backgroundColor: '#ffffff',
                        height: 50,
                    }
                },
            });
        return (
            <View style={styles.page}>
                <View style={styles.paddingText}>
                    <Image
                        style={styles.img}
                        source={{uri: this.state.doc_info.head_url}}
                    />
                    <View style={styles.paddingLeftText}>
                        <Text style={styles.titleUserName}>{this.state.doc_info.name}</Text>
                        <Text style={styles.titleOffice}>{this.state.doc_info.hospital_name}</Text>
                        <Text
                            style={styles.titleOffice}>{this.state.doc_info.hospital_department_name}{this.state.doc_info.job_title}
                        </Text>
                    </View>
                </View>
                <MainScreenNavigator
                    screenProps={{
                        doc_name: this.state.doc_info.name,
                        doctor_id: this.state.doctor_id,
                        address_id: this.state.address_id,
                        navigation: this.props.navigation
                    }}/>
            </View>
            // <View style={styles.page}>
            //     <View style={styles.paddingText}>
            //         <Image
            //             style={styles.img}
            //             source={{uri: this.state.doc_info.head_url}}
            //         />
            //         <View style={styles.paddingLeftText}>
            //             <Text style={styles.titleUserName}>{this.state.doc_info.name}</Text>
            //             <Text style={styles.titleOffice}>{this.state.doc_info.hospital_name}</Text>
            //             <Text
            //                 style={styles.titleOffice}>{this.state.doc_info.hospital_department_name}{this.state.doc_info.job_title}
            //             </Text>
            //         </View>
            //     </View>
            //     <View style={styles.nest}>
            //         <MainScreenNavigator
            //             screenProps={this.state.doctor_id/* this prop will get passed to the screen components as this.props.screenProps */}/>
            //     </View>
            //     <View style={styles.wire}></View>
            //     {/*<Date/>*/}
            // </View>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    wire: {
        paddingTop: 12,
        backgroundColor: '#f0f0f0'
    },
    nest: {
        marginTop: 1,
        // height: 500,
    },
    paddingText: {
        paddingVertical: 7,
        paddingLeft: 14,
        paddingRight: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#dddddd'
    },
    img: {
        width: 70,
        height: 80,
        paddingTop: 12
    },
    paddingLeftText: {
        paddingLeft: 24,
        width: '75%'
    },
    titleUserName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#444444'
    },
    titleOffice: {
        fontSize: 14,
        color: '#444444',
        paddingTop: 12
    },
    heigh: {
        height: '100%'
    },
});