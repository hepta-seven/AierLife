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
    ListView,
    RefreshControl,
    TouchableNativeFeedback
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class ConsultingRoom extends React.Component {
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
            speciality_id: '',
            dataSource: ds,
            isRefreshing: false,
        };
    };

    _onAierDoctorButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('DetailsDoctor');
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.setState({hospital_id: params.hospital_id}, () => {
            //   console.log(this.state)
        });
        this.setState({speciality_id: params.speciality_id}, () => {
            // console.log(this.state)
        });
        AsyncStorage.getItem('mytoken', (err, result) => {
            console.log(result);
            let me = this;
            this.setState({mytoken: result}, () => {
                let myparams = {
                    'token': this.state.mytoken,
                    'hospital_id': this.state.hospital_id,
                    'speciality_id': this.state.speciality_id,
                    'page': 0,
                    'count': 100
                };
                console.log(myparams);
                NetUitl.get(API.APIList.speciality_of_hospital, myparams, function (res) {
                    //下面的就是请求来的数据
                    console.log(res);
                    me._data = res.result;
                    me.setState({
                        data: res.result,
                        dataSource: me.state.dataSource.cloneWithRows(me._data),
                    });
                });
            });
        });
    }

    _onRowPress(data) {
        console.log(data);
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailsDoctor',
            params: {doctor_id: data.id, address_id: this.state.hospital_id},
        });
        console.log(data.id + '+' + this.state.hospital_id);
        this.props.navigation.dispatch(navigateAction);
    }

    _renderRow(rowData, sectionID, rowID) {
        // console.log(rowData);
        return (
            <TouchableNativeFeedback onPress={() => {
                this._onRowPress(rowData);
            }}>
                <View style={styles.paddingText}
                >
                    <Image
                        style={styles.img}
                        source={{uri: rowData.head_url}}
                    />
                    <View style={styles.paddingLeftText}>
                        <Text style={styles.titleUserName}>{rowData.name}</Text>
                        <Text style={styles.titleOffice}>{rowData.hospital_name}</Text>
                        <Text style={styles.titleText}>{rowData.introducation}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _onRefresh() {
        this._refreshData();
    }

    _refreshData() {
        this.setState({
            isRefreshing: true
        });
        let me = this;
        let myparams = {
            'token': this.state.mytoken,
            'hospital_id': this.state.hospital_id,
            'speciality_id': this.state.speciality_id,
            'page': 0,
            'count': 100
        };
        NetUitl.get(API.APIList.speciality_of_hospital, myparams, function (res) {
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
            <View style={styles.page}>
                <View>
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
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    paddingText: {
        paddingTop: 20,
        paddingBottom: 19,
        paddingLeft: 15,
        paddingRight: 20,
        flexDirection: 'row',
        borderBottomWidth: 0.7,
        borderColor: '#dddddd'
    },
    img: {
        width: 60,
        height: 68,
    },
    paddingLeftText: {
        paddingLeft: 15,
        width: '75%'
    },
    titleUserName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#444444'
    },
    titleOffice: {
        fontSize: 13,
        color: '#444444',
        paddingTop: 9
    },
    titleText: {
        fontSize: 10,
        color: '#707070',
        paddingTop: 12
    },
});