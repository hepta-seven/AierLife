/**
 * Created by 七七 on 2017/4/22.
 */
import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    ListView,
    Text,
    RefreshControl,
    ActivityIndicator,
    Button,
    TouchableNativeFeedback
} from 'react-native';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class OrderNorPay extends React.Component {
    static navigationOptions = {
        title: '已付款'
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
            let me = this;
            this.setState({normal_user_id: result}, () => {
            });
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            console.log(result);
            let me = this;
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
        NetUitl.get(API.APIList.normal_user_paid, myparams, function (res) {
            //下面的就是请求来的数据
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
    }

    _renderRow(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <TouchableNativeFeedback onPress={() => {
                this._onRowPress(rowData);
            }}>
                <View style={styles.OrdersFormStyle}>
                    <View style={styles.patientLine}>
                        <View style={styles.lineItem}>
                            <Text>{rowData.appointment_time}</Text>
                            <Text>{rowData.patient_name}</Text>
                        </View>
                        <View>
                            <Text>{rowData.time_type === 1 ? "普通" : rowData.time_type === 2 ? "加急" : "实时"}预约</Text>
                        </View>
                    </View>
                    <View style={styles.doctorLine}>
                        <View style={styles.lineItem}>
                            <Text>{rowData.doctor_department}</Text>
                            <Text>{rowData.doctor_name}</Text>
                        </View>
                        <View>
                            <Text style={styles.prices}>￥{rowData.price}</Text>
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
            <View style={styles.page}>
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
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    OrdersFormStyle: {
        borderWidth: 1,
        borderColor: '#dddddd',
        height: 80,
        alignItems: 'flex-start',
        paddingVertical: 15,
        paddingHorizontal: 16
    },
    patientLine: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    doctorLine: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    prices: {
        color: '#ff0000'
    }

});