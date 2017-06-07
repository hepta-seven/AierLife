/**
 * Created by 陈腾飞 on 2017/4/23.
 */
//医生详情日期选择组件
import React from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    View,
    Text,
    ScrollView,
    ListView,
    TouchableOpacity
} from 'react-native';
import {TabNavigator, NavigationActions} from 'react-navigation';
import NetUitl from './NetUitl';
import API from './API';

const screenW = Dimensions.get('window').width;
const cols = 4;
const cellWH = screenW / cols - 5;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 10;

export default class Date extends React.Component {
    _result = [];


    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            navigation: this.props.screenProps.navigation,
            selectDate: '请选择日期',
            selectTime: '请选择时间',
            time_type: 1,
            price: 0,
            orig_price: 0,
            doc_name: this.props.screenProps.doc_name,
            doctor_id: this.props.screenProps.doctor_id,
            address_id: this.props.screenProps.address_id,
            dateSelect: ds.cloneWithRows(this._result),
            timeAMSelect: ds.cloneWithRowsAndSections(
                {
                    'am': [],
                    'pm': []
                }),
            isLoging: true,
            circleSize: 0
        };
    };


    componentWillMount() {
        AsyncStorage.getItem('mytoken', (err, result) => {
            // console.log(result);
            let me = this;
            this.setState({mytoken: result, circleSize: 'large'}, () => {
                console.log(this);
                let myparams = {
                    'token': this.state.mytoken,
                    'doctor_id': this.state.doctor_id,
                    'address_id': this.state.address_id
                };
                console.log(myparams);
                NetUitl.get(API.APIList.available_appointment, myparams, function (res) {
                    //下面的就是请求来的数据
                    console.log(res);
                    //下面为讲动态获取的数据赋给ListView
                    me._result = res.result;
                    let ds = new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2,
                        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
                    });
                    for (let i = 0; i < 5; i++) {
                        me.setState({
                            dateSelect: ds.cloneWithRows(me._result),
                            timeAMSelect: ds.cloneWithRowsAndSections({
                                'am': me._result[0].am_times,
                                'pm': me._result[0].pm_times,
                            }),
                            circleSize: 0
                        }, () => {
                            // console.log(me);
                        });
                    }
                });
            });
        });
    }

    _renderSectionHeader(sectionData, sectionID) {
        if (sectionID === 'am') {
            return (
                <View style={styles.sectionHeader}>
                    <Text style={styles.materText}>选择上午时间</Text>
                    <View style={styles.wire}/>
                    <View style={styles.across}/>
                </View>
            )
        } else if (sectionID === 'pm') {
            return (
                <View style={styles.sectionHeader}>
                    <Text style={styles.materText}>选择下午时间</Text>
                    <View style={styles.wire}/>
                    <View style={styles.across}/>
                </View>
            )
        }
    }

    _renderDateSeparator(rowID, sectionID, adjacentRowHighlighted) {
        return (
            <View
                key={rowID}
                style={{
                    height: '100%',
                    width: adjacentRowHighlighted ? 3 : 2,
                    backgroundColor: adjacentRowHighlighted ? '#FF9900' : 'transparent'
                }}
            />
        );
    }

    _renderTimeSeparator(rowID, sectionID, adjacentRowHighlighted) {
        return (
            <View
                key={rowID}
                style={{
                    height: 60,
                    width: adjacentRowHighlighted ? 3 : 2,
                    backgroundColor: adjacentRowHighlighted ? '#FF9900' : 'transparent'
                }}
            />
        );
    }


    _onDateRowPress(rowData, sectionID, rowID) {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.setState({
            selectDate: rowData.date,
            price: rowData.price,
            orig_price: rowData.orig_price,
            time_type: rowData.time_type,
            // dateSelect: ds.cloneWithRows(this._result),
            timeAMSelect: ds.cloneWithRowsAndSections({
                'am': rowData.am_times,
                'pm': rowData.pm_times
            }),
        }, () => {
            console.log(this.state)
        });
    }

    _onTimeAMRowPress(rowData, sectionID, rowID) {
        console.log(rowID);
        this.setState({
            selectTime: rowData.time,

        }, () => {
            console.log(this.state)
        });
    }

    render() {
        const {navigate} = this.props.screenProps.navigation;
        return (
            <View View style={styles.wholePage}>
                <ScrollView>
                    <View style={styles.page}>
                        <Text style={styles.materText}>爱尔诊所后宰门诊室后宰门130号创之星大厦一单元122（中户）</Text>
                    </View>
                    <View style={styles.wire}/>
                    <ActivityIndicator animating={this.state.isLoging} size={this.state.circleSize}/>
                    <View style={styles.page}>
                        <Text style={styles.materText}>日期选择</Text>
                    </View>
                    <View style={styles.wire}/>
                    <View style={styles.across}>
                        <View>
                            <View style={styles.datePage}>
                                <Text style={styles.dateText}>日期</Text>
                            </View>
                            <View style={styles.dateAmPage}>
                                <Text style={styles.dateAmText}>上午</Text>
                            </View>
                            <View style={styles.dateAmPage}>
                                <Text style={styles.dateAmText}>下午</Text>
                            </View>
                        </View>
                        <ListView dataSource={this.state.dateSelect}
                                  renderRow={this._selectDateRow.bind(this)}
                                  contentContainerStyle={styles.DateViewBox}
                                  horizontal={true}
                                  enableEmptySections={true}
                                  renderSeparator={this._renderDateSeparator}
                        />
                    </View>
                    <View style={styles.wire}/>
                    <ListView dataSource={this.state.timeAMSelect}
                              renderRow={this._selectTimeAMRow.bind(this)}
                              contentContainerStyle={styles.ListViewBox}
                              enableEmptySections={true}
                              renderSeparator={this._renderTimeSeparator}
                              renderSectionHeader={this._renderSectionHeader.bind(this)}/>
                </ScrollView>
                <View style={styles.paged}>
                    <View style={styles.urgent}>
                        <View style={styles.urgentText}>
                            <Text
                                style={styles.urgentOrder}>{this.state.time_type === 1 ? '普通' : this.state.time_type === 2 ? '加急' : this.state.time_type === 3 ? '实时' : '不可预约'}</Text>
                            <Text style={styles.urgentMoney}>{this.state.orig_price}元</Text>
                        </View>
                        <View style={styles.favorableText}>
                            <Text style={styles.favorableOrder}>提前预约享受更多优惠！</Text>
                            <Text style={styles.favorableMoney}>{this.state.price}元</Text>
                        </View>
                    </View>
                    <View style={styles.submit}>
                        <TouchableOpacity onPress={() => {
                            console.log(this);
                            navigate('DiseaseDescriptionScene', {
                                doctor_id: this.state.doctor_id,
                                address_id: this.state.address_id,
                                doc_name: this.state.doc_name,
                                selectDate: this.state.selectDate,
                                selectTime: this.state.selectTime,
                                time_type: this.state.time_type,
                            });
                        }} disabled={this.state.selectDate === '请选择日期' && this.state.selectTime === '请选择时间'}
                                          style={{
                                              backgroundColor: this.state.selectDate !== '请选择日期' && this.state.selectTime !== '请选择时间' ? 'transparent' : '#eeeeee',
                                              height: 60
                                          }}>
                            <Text style={styles.submitText}>提交预约</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    _selectTimeAMRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity onPress={() => {
                this._onTimeAMRowPress(rowData, sectionID, rowID);
                highlightRow(sectionID, rowID);
            }} disabled={rowData.count === -1}
                              style={{backgroundColor: rowData.count === -1 ? '#eeeeee' : 'transparent'}}>
                <View style={styles.innerViewStyle}>
                    <View style={styles.appointmentTime}>
                        <Text style={styles.appointmentSubscribe}>
                            {rowData.time}
                        </Text>
                        <Text style={styles.appointmentSubscribes}>
                            {rowData.count === -1 ? ' ' : '余号' + rowData.count + '个'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    _selectDateRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity onPress={() => {
                this._onDateRowPress(rowData, sectionID, rowID);
                highlightRow(sectionID, rowID);
            }}
                              disabled={!(rowData.am || rowData.pm)}
                              style={{backgroundColor: rowData.am || rowData.pm ? 'transparent' : '#eeeeee'}}>
                <View style={styles.weekPage}>
                    <Text style={styles.weekText}>
                        {rowData.date}
                    </Text>
                    <Text style={styles.weekText}>
                    </Text>
                </View>
                <View style={styles.visitPage}>
                    <Text style={styles.visitText}>
                        {rowData.am ? '坐诊' : ''}
                    </Text>
                </View>
                <View style={styles.visitPage}>
                    <Text style={styles.visitText}>
                        {rowData.pm ? '坐诊' : ''}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };
}
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    materText: {
        width: '100%',
        fontSize: 14,
        color: '#444444',
        height: 40,
        lineHeight: 30,
        textAlign: 'center',
    },
    wire: {
        paddingTop: 1,
        backgroundColor: '#f0f0f0',
        height: 2,
    },
    across: {
        // width: 475,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width
    },
    DateViewBox: {
        flexDirection: 'row',
        height: 115
    },
    ListViewBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    datePage: {
        width: 38,
        height: 52,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    dateText: {
        width: 38,
        fontSize: 14,
        color: '#444444',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    dateAmPage: {
        width: 38,
        height: 32,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    dateAmText: {
        width: 38,
        fontSize: 13,
        color: '#444444',
        textAlign: 'center',
        paddingVertical: 8,
    },
    weekPage: {
        width: '100%',
        height: 52,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    weekText: {
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 9,
        paddingTop: 4
    },
    visitPage: {
        width: '100%',
        height: 32,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    visitText: {
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        color: '#72c3f2'
    },
    innerViewStyle: {
        width: cellWH,
        height: 60,
        justifyContent: 'center',
        // 文字内容居中对齐
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    appointmentTime: {
        width: '100%',
        justifyContent: 'center',
    },
    appointmentSubscribe: {
        fontSize: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#5cbaee'
    },
    appointmentSubscribes: {
        fontSize: 13,
        textAlign: 'center',
        paddingHorizontal: 21,
        color: '#5cbaee'
    },
    aloneSubscribe: {
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 21,
        paddingTop: 20,
        color: '#f36e6f'
    },
    aloneSubscribes: {
        fontSize: 13,
        textAlign: 'center',
        paddingHorizontal: 21,
        color: '#f36e6f'
    },
    paged: {
        // marginTop: 20,
        flexDirection: 'row',
    },
    urgent: {
        borderWidth: 1,
        borderColor: '#dddddd',
        width: '75%',
        height: 60,
    },
    urgentText: {
        flexDirection: 'row',
        paddingHorizontal: 11,
        paddingTop: 8
    },
    urgentOrder: {
        color: '#444444',
        fontSize: 15

    },
    urgentMoney: {
        paddingLeft: 145,
        fontSize: 15,
        textDecorationLine: 'line-through'
    },
    favorableText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 11,
        // paddingTop: 8,
        // paddingBottom: 8,
    },
    favorableOrder: {
        fontSize: 15

    },
    favorableMoney: {
        color: '#ff3b30',
        paddingLeft: 38,
        fontSize: 16
    },
    submit: {
        backgroundColor: '#387ef5',
        width: '25%',
        height: 60
    },
    submitText: {
        paddingTop: 22,
        textAlign: 'center',
        color: '#ffffff'
    },
    sectionHeader: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // textAlign: 'center',
    },
    wholePage: {
        flex: 1,
    }

});