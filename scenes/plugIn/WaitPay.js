/**
 * Created by 七七 on 2017/4/21.
 */
import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl,
    Image,
    TouchableNativeFeedback,
} from 'react-native';
import NetUitl from './NetUitl';
import API from './API';

export default class PressAffirm extends React.Component {
    static navigationOptions = {
        title: '待支付'
    };
    _data = [];

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            mytoken: '',
            normal_user_id: '',
            dataSource: ds,
            isRefreshing: false,
            isLoadingMore: false
        };
    };

    componentDidMount() {
        AsyncStorage.getItem('normal_user_id', (err, result) => {
            console.log(result);
            this.setState({normal_user_id: result}, () => {
            });
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            console.log(result);
            this.setState({mytoken: result}, () => {
                this._refreshData();
            });
        });
    }

    _refreshData() {
        this.setState({
            isRefreshing: true
        });
        let me = this;
        let myparams = {
            'token': this.state.mytoken,
            'normal_user_id': this.state.normal_user_id,
        };
        NetUitl.get(API.APIList.normal_user_unpaid, myparams, function (res) {
            console.log(res);
            me._data = res.result;
            me.setState({
                dataSource: me.state.dataSource.cloneWithRows(me._data),
                isRefreshing: false
            });
        });
    }

    _onRowPress(data) {
        console.log(data);
        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'ClinicIntro',
        //     params: {hospital_id: data.id},
        // });
        // this.props.navigation.dispatch(navigateAction)
    }

    _renderRow(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <TouchableNativeFeedback onPress={() => {
                this._onRowPress(rowData);
            }}>
                <View style={styles.doctorIntroductions}>
                    <View style={styles.suggest}>
                        <Image style={styles.doctorPhoto}
                               source={{uri: rowData.doctor_head_url}}/>
                    </View>
                    <View style={styles.doctorIntroductionText}>
                        <View style={styles.doctorIntroductionTextNameAndOffice}>
                            <Text
                                style={styles.doctorIntroductionTextName}>{rowData.doctor_name}&nbsp;&nbsp;&nbsp;{rowData.doctor_job_title}</Text>
                        </View>
                        <View>
                            <Text style={styles.doctorHospital}>{rowData.appointment_address}</Text>
                        </View>
                        <View>
                            <Text style={styles.doctorSuggest}>预约时间：{rowData.appointment_time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _onRefresh() {
        this._refreshData();
    }

    render() {
        return (
            <View>{
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          refreshControl={<RefreshControl
                              refreshing={this.state.isRefreshing}
                              onRefresh={this._onRefresh.bind(this)}
                              title="加载中..."
                          />}
                          enableEmptySections={true}
                    // renderFooter={this._renderFooter.bind(this)}
                    // onEndReached={this._onEndReached.bind(this)}
                />
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    doctorIntroductions: {
        marginTop: 5,
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
    doctorHospital: {
        paddingVertical: 10,
        fontSize: 12
    },
    doctorPhoto: {
        width: 70,
        height: 90
    },
    doctorSuggest: {
        width: 200,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#09a9ef',
        fontSize: 12,
        color: '#09a9ef',
    },
    suggest: {
        alignItems: 'center'
    }
});