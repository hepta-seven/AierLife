/**
 * Created by Ramirez on 4/20/2017.
 */

import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    RefreshControl,
    TouchableNativeFeedback
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class HomeScene extends React.Component {
    static navigationOptions = {
        title: '诊室'
    };
    _data = [];

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            mytoken: '',
            hospital_id: '',
            latitude: 108.5632,
            longitude: 34.1539,
            data: {},
            dataSource: ds,
            isRefreshing: false,
        };
    };

    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.setState({hospital_id: params.hospital_id}, () => {
            console.log(this.state)
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            console.log(result);
            let me = this;
            this.setState({mytoken: result}, () => {
                console.log(this.state);
                let myparams = {
                    'token': this.state.mytoken,
                    'hospital_id': this.state.hospital_id
                };
                console.log(myparams);
                NetUitl.get(API.APIList.hospital_show, myparams, function (res) {
                    //下面的就是请求来的数据
                    console.log(res);
                    me._data = res.result;
                    me.setState({
                        data: res.result,
                        dataSource: me.state.dataSource.cloneWithRows(me._data.specialities),
                        name: res.result.name,
                        address: res.result.address,
                        latitude: res.result.latitude,
                        longitude: res.result.longitude
                    });
                });
            });
        });

    }

    _onRowPress(data) {
        console.log(data);
        console.log(this.state.hospital_id);
        const navigateAction = NavigationActions.navigate({
            routeName: 'PostSlaughterScene',
            params: {speciality_id: data.id, hospital_id: this.state.hospital_id},
        });
        this.props.navigation.dispatch(navigateAction)
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableNativeFeedback onPress={() => {
                this._onRowPress(rowData);
            }}>
                <View style={styles.doctorIntroductions} key={rowData.id}>
                    <View style={styles.doctorIntroductionText}>
                        <View style={styles.doctorIntroductionTextNameAndOffice}>
                            <Text style={styles.doctorIntroductionTextName}>{rowData.name}</Text>
                            <Text
                                style={styles.doctorIntroductionTextOffice}>{rowData.doctor_count}位三甲医师</Text>
                        </View>
                        <View>
                            <Text style={styles.doctorHospital}>{rowData.description}</Text>
                        </View>
                    </View>
                    <View style={styles.chevronRight}>
                        <Text><FontAwesomeIcon name="chevron-right"/></Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _onAierClinicLocationClick() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ClinicLocation',
            params: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                name: this.state.name,
                address: this.state.address
            },
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.page}>
                    {/*版图*/}
                    <Image style={styles.headerImg} source={{uri: this.state.data.pic_url}}/>
                    {/*二级导航*/}
                    <View style={styles.clinicInfo}>
                        <Text style={styles.clinicInfoText}>{this.state.data.name}</Text>
                        <View style={styles.clinicFeatures}>
                            <Text><FontAwesomeIcon name="check-circle" color="#3399FF"/>&nbsp;三甲名医出诊&nbsp;&nbsp;</Text>
                            <Text><FontAwesomeIcon name="check-circle" color="#3399FF"/>&nbsp;无过度医疗&nbsp;&nbsp;</Text>
                        </View>
                        <TouchableNativeFeedback onPress={this._onAierClinicLocationClick.bind(this)}
                                                 background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.clinicBetween}>
                                <Text style={styles.clinicMargin}><FontAwesomeIcon name="map-marker"/>&nbsp;
                                    {this.state.data.address}</Text>
                                <Text style={styles.clinicChevron}><FontAwesomeIcon name="chevron-right"/></Text>
                            </View>
                        </TouchableNativeFeedback>

                        <Text style={styles.clinicNumber}><FontAwesomeIcon name="phone"/>&nbsp;{this.state.data.phone}
                        </Text>
                    </View>

                    {/**/}
                    <View >
                        <Text style={styles.doctorIntroductionTitle}>科室<Text style={styles.clickAbleText}>&nbsp;&nbsp;
                            (点击科室选择医生进行门诊预约)</Text></Text>
                    </View>
                    <View>
                        <ListView dataSource={this.state.dataSource}
                                  renderRow={this._renderRow.bind(this)}
                                  enableEmptySections={true}/>
                    </View>
                    <View >
                        <Text style={styles.doctorIntroductionTitle}>诊所介绍</Text>
                        <View style={styles.clinicInroduction}>
                            <Text style={styles.clinicInroText}>&nbsp;&nbsp;&nbsp;&nbsp;
                                爱尔诊所是爱尔生活集团旗下,高品质专业口腔诊所.诊所坐诊专家团队均由本地三甲医院主任及副主任医师组成.爱尔诊所可为患者提供线上与线下专业诊疗方案.</Text>
                        </View>
                    </View>
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
        height: 300,
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
    },
    subNavButtonText: {
        width: '50%',
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
        fontSize: 14,
        marginTop: 13,
        color: 'black',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        paddingTop: 11,
        paddingLeft: 15,
        paddingBottom: 13,
    },
    clinicInfo: {
        backgroundColor: '#ffffff',
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 17,
    },
    clinicFeatures: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 28,
    },
    clinicBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clinicMargin: {
        paddingVertical: 8,
        paddingBottom: 22
    },
    clinicNumber: {
        paddingVertical: 8,
        color: '#0000ee'
    },
    clinicChevron: {
        paddingVertical: 11
    },
    clinicInfoText: {
        fontSize: 20,
        color: 'black'
    },
    clickAbleText: {
        color: "#87cefa",
        marginLeft: 5,
    },
    clinicInroduction: {
        marginTop: 1,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    clinicInroText: {
        fontSize: 14,
        paddingTop: 14,
        paddingLeft: 10,
        paddingBottom: 20,
        paddingRight: 20
    },
    doctorIntroductions: {
        marginTop: 1,
        paddingTop: 17,
        paddingLeft: 15,
        paddingBottom: 19,
        paddingRight: 22,
        paddingHorizontal: 0,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
    },
    doctorIntroductionText: {
        flex: 8,
        paddingHorizontal: 10,
        // width: 100
    },
    chevronRight: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'flex-end',
        // width: 100
    },
    doctorIntroductionTextNameAndOffice: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doctorIntroductionTextName: {
        fontSize: 16,
        color: '#444444',
        fontWeight: 'bold',
    },
    doctorIntroductionTextOffice: {
        paddingHorizontal: 10,
    },
    doctorHospital: {
        paddingVertical: 5,
        color: '#444444'
    },

});