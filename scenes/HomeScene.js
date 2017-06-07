/**
 * Created by Ramirez on 4/20/2017.
 */

import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ListView,
    ScrollView,
    RefreshControl,
    Alert,
    TouchableNativeFeedback
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import DoctorIntroduction from './plugIn/DoctorIntroduction'
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class HomeScene extends React.Component {
    static navigationOptions = {
        title: '登录', headerVisible: false
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            mytoken: '',
            dataSource: ds,
            isRefreshing: false,
            normal_user_id: ''
        };
    };

    _onAierClinicButtonClick() {
        // let params = {
        //     'token': this.state.mytoken,
        // };
        // NetUitl.get(API.APIList.all_hospital, params, function (res) {
        //     //下面的就是请求来的数据
        //     console.log(res);
        //     AsyncStorage.setItem('hospitalList', JSON.stringify(res)).then(
        //         () => {   //成功的操作
        //             console.log("hospitalList保存成功!");
        //         },
        //     );
        // });
        const navigate = this.props.navigation.navigate;
        navigate('OutpatientScene');
    }

    componentDidMount() {
        AsyncStorage.getItem('normal_user_id', (err, result) => {
            // console.log(result);
            let me = this;
            this.setState({normal_user_id: result}, () => {
            });
        });

        AsyncStorage.getItem('mytoken', (err, result) => {
            // console.log(result);
            let me = this;
            this.setState({mytoken: result}, () => {
                let myparams = {
                    'token': this.state.mytoken,
                };
                NetUitl.get(API.APIList.recommend_doctor, myparams, function (res) {
                    //下面的就是请求来的数据
                    // console.log(res);
                    me._data = res.result;
                    me.setState({
                        data: res.result,
                        dataSource: me.state.dataSource.cloneWithRows(me._data),
                        isRefreshing: false
                    });
                });
            });
        });
    }

    _onRowPress(data) {
        console.log(data);
        let me = this;
        let params = {
            'token': this.state.mytoken,
            'doctor_id': data.id
        };
        NetUitl.get(API.APIList.doctor_show, params, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            // me._data = res.result;
            // me.setState({
            // dataSource: me.state.dataSource.cloneWithRows(me._data),

            // });
        });
        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'ClinicIntro',
        //     params: {hospital_id: data.id},
        // });
        // this.props.navigation.dispatch(navigateAction)
    }

    _renderRow(rowData, sectionID, rowID) {
        // console.log(rowData);
        return (
            <TouchableNativeFeedback onPress={() => {
                this._onRowPress(rowData);
            }}>
                <View style={styles.doctorIntroductions}>
                    <View>
                        <Image style={styles.doctorPhoto}
                               source={{uri: rowData.head_url}}/>
                    </View>
                    <View style={styles.doctorIntroductionText}>
                        <View style={styles.doctorIntroductionTextNameAndOffice}>
                            <Text style={styles.doctorIntroductionTextName}>{rowData.name}</Text>
                            <Text
                                style={styles.doctorIntroductionTextOffice}>{rowData.hospital_department_name} &nbsp;{rowData.job_title}</Text>
                        </View>
                        <View>
                            <Text style={styles.doctorHospital}>{rowData.hospital_name}</Text>
                        </View>
                        <View>
                            <Text style={styles.doctorResume}>{rowData.introducation}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _onRefresh() {
        this._refreshData();
    }

    _refreshData() {
        console.log(this.state);
        let myparams = {
            'token': this.state.mytoken,
        };
        this.setState({
            isRefreshing: true
        });
        let me = this;
        NetUitl.get(API.APIList.recommend_doctor, myparams, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            me._data = res.result;
            me.setState({
                data: res.result,
                dataSource: me.state.dataSource.cloneWithRows(me._data),
                isRefreshing: false
            });
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.page}>
                    {/*版图*/}
                    <Image style={styles.headerImg} source={require('../img/pic_home_banner.png')}/>
                    {/*二级导航*/}
                    <View style={styles.subNav}>
                        <View style={styles.subNavButton}>
                            <View style={styles.subNavButtonText}>
                                <Text style={styles.subNavButtonTextBig}>复诊</Text>
                                <Text>及时复诊预约</Text>
                            </View>
                            <View >
                                <Image style={styles.subNavButtonImg} source={require('../img/icon_fuzhen.png')}/>
                            </View>
                        </View>
                        <TouchableNativeFeedback onPress={this._onAierClinicButtonClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.subNavButton}>
                                <View style={styles.subNavButtonText}>
                                    <Text style={styles.subNavButtonTextBig}>爱尔诊所</Text>
                                    <Text>名医坐诊</Text>
                                </View>
                                <View>
                                    <Image style={styles.subNavButtonImg}
                                           source={require('../img/icon_aierzhensuo.png')}/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.subNav}>
                        <View style={styles.subNavButton}>
                            <View style={styles.subNavButtonText}>
                                <Text style={styles.subNavButtonTextBig}>名医联盟</Text>
                                <Text>线上咨询</Text>
                            </View>
                            <View >
                                <Image style={styles.subNavButtonImg} source={require('../img/icon_aierzhensuo.png')}/>
                            </View>
                        </View>
                        <View style={styles.subNavButton}>
                            <View style={styles.subNavButtonText}>
                                <Text style={styles.subNavButtonTextBig}>商户联盟</Text>
                                <Text>信赖商户</Text>
                            </View>
                            <View>
                                <Image style={styles.subNavButtonImg} source={require('../img/icon_major.png')}/>
                            </View>
                        </View>
                    </View>
                    {/**/}
                    <View >
                        <Text style={styles.doctorIntroductionTitle}>名医联盟推荐医生</Text>
                    </View>
                    <ListView dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}
                              refreshControl={<RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this._onRefresh.bind(this)}
                                  title="加载中..."
                                  enableEmptySections={true}/>}
                        // renderFooter={this._renderFooter.bind(this)}
                        // onEndReached={this._onEndReached.bind(this)}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    headerImg: {
        width: '100%',
        height: 180,
    },
    subNav: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    subNavButton: {
        borderWidth: 1,
        borderColor: '#f0f0f0',
        width: '50%',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 70
    },
    subNavButtonText: {
        width: '60%',
    },
    subNavButtonTextBig: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444444'
    },
    subNavButtonImg: {
        marginHorizontal: 20,
        width: 40,
        height: 40
    },
    doctorIntroductionTitle: {
        marginTop: 12,
        color: 'black',
        paddingHorizontal: 16,
        paddingVertical: 14,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    doctorIntroductions: {
        marginTop: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    doctorIntroductionText: {
        paddingHorizontal: 20,
        width: '85%'
    },
    doctorIntroductionTextNameAndOffice: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    doctorIntroductionTextName: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    doctorIntroductionTextOffice: {
        paddingHorizontal: 20,
    },
    doctorHospital: {
        paddingVertical: 5,
        color: '#444444'
    },
    doctorResume: {
        fontSize: 12
    },
    doctorPhoto: {
        width: 70,
        height: 90
    }
});