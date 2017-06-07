/**
 * Created by 陈腾飞 on 2017/4/21.
 */
import React from 'react';
import {
    AsyncStorage,
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ListView,
    ActivityIndicator,
    TouchableNativeFeedback,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';


export default class OutpatientScene extends React.Component {
    static navigationOptions = {
        title: '爱尔生活'
    };
    _data = [];

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            mytoken: '',
            dataSource: ds,
            isRefreshing: false,
            isLoadingMore: false
        };
    };

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
                />
            </View>
        );
    }

    _onAierClinicButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('ClinicIntro');
    }

    componentDidMount() {
        AsyncStorage.getItem('mytoken', (err, result) => {
            this.setState({mytoken: result}, () => {
                this._refreshData();
            });
        });
    }

    _onRowPress(data) {
        console.log(data);
        const navigateAction = NavigationActions.navigate({
            routeName: 'ClinicIntro',
            params: {hospital_id: data.id},
        });
        this.props.navigation.dispatch(navigateAction)
    }

    _renderRow(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <TouchableNativeFeedback onPress={() => {
                this._onRowPress(rowData);
            }}>
                <View style={styles.paddingText}>
                    <Image
                        style={styles.img}
                        source={{uri: rowData.pic_url}}
                    />
                    <View style={styles.paddingLeftText}>
                        <View style={styles.flex}>
                            <Text style={styles.titleName}>{rowData.name}</Text>
                            <Text style={styles.titleText}>{rowData.doctor_count}位三甲医生</Text>
                        </View>
                        <View style={styles.buttonType}>
                            <Text style={styles.buttonText}>{rowData.departments[0].name}</Text>
                        </View>
                        <View style={styles.paddingTopText}>
                            <Image
                                style={styles.logo}
                                source={require('../img/icon_address.png')}
                            />
                            <Text style={styles.titleAddress}>{rowData.address}</Text>
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
        let params = {
            'token': this.state.mytoken,
        };
        this.setState({
            isRefreshing: true
        });
        let me = this;
        NetUitl.get(API.APIList.all_hospital, params, function (res) {
            //下面的就是请求来的数据
            me._data = res.result;
            me.setState({
                dataSource: me.state.dataSource.cloneWithRows(me._data),
                isRefreshing: false
            });
        });
    }

    _loadMoreData() {
        let params = {
            'token': this.state.mytoken,
        };
        if (this._data.length === 0) {
            return;
        }

        this.setState({
            isLoadingMore: true
        });
        let me = this;
        NetUitl.get(API.APIList.all_hospital, params, function (res) {
            //下面的就是请求来的数据
            me._data = res.result;
            me.setState({
                dataSource: me.state.dataSource.cloneWithRows(me._data),
                isLoadingMore: false
            });
        });

    }

    _renderFooter() {
        if (this.state.isLoadingMore) {
            return (
                <ActivityIndicator/>
            );
        } else {
            return null;
        }
    }

    _onEndReached() {
        this._loadMoreData();
    }
}

const
    styles = StyleSheet.create({
        page: {
            backgroundColor: '#ffffff',
            height:'100%'
        },
        paddingText: {
            paddingTop: 18,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 21,
            flex: 1,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#dddddd'
        },
        flex: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end'
        },
        img: {
            width: 80,
            height: 70,
        },
        paddingLeftText: {
            paddingLeft: 16,
        },
        titleName: {
            fontSize: 15,
            color: '#444444',
            fontWeight: 'bold',
        },
        titleText: {
            fontSize: 10,
            marginLeft: 9,
            color: '#888888'
        },
        titleAddress: {
            fontSize: 12,
            color: '#888888',
        },
        paddingTopText: {
            flex: 1,
            flexDirection: 'row',
        },
        logo: {
            width: 17,
            height: 17,
        },
        buttonType: {
            marginTop: 9,
            marginBottom: 9,
            backgroundColor: '#60bdf8',
            width: 52,
            height: 23,
        },
        buttonText: {
            textAlign: 'center',
            lineHeight: 18,
            fontSize: 10,
            color: '#ffffff',
        }
    });