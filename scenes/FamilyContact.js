/**
 * Created by Ramirez on 4/20/2017.
 */

import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Alert,
    Text,
    Button,
    Image,
    ScrollView,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NetUitl from './plugIn/NetUitl';
import API from './plugIn/API';

export default class ResetPasswordScene extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '家庭联系人',
        headerRight: (
            <TouchableOpacity onPress={() => {
                console.log('TouchableOpacity onPress...');
                navigation.state.params.rightButtonClick();
            }}>
                <View style={
                    {
                        marginRight: 5,
                        width: 60,
                        borderWidth: 3,
                        borderColor: '#dddddd',
                        paddingHorizontal: 12,
                        paddingVertical: 3
                    }
                }>
                    <Text>添加</Text>
                </View>
            </TouchableOpacity>
        )
    });

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
        const navigation = this.props.navigation;
        navigation.setParams({
            rightButtonClick: this._onAddButtonClick.bind(this)
        });
        //-----------------------
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
        NetUitl.get(API.APIList.user_patient_list, myparams, function (res) {
            //下面的就是请求来的数据
            console.log(res);
            me._data = res.result;
            me.setState({
                dataSource: me.state.dataSource.cloneWithRows(me._data),
                isRefreshing: false
            });
        });
    }

    _onAddButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('AddContact');
    }

    _onRowPress(data) {
        console.log(data);
        const navigateAction = NavigationActions.navigate({
            routeName: 'ModifyContact',
            params: {contactInfo: data},
        });
        this.props.navigation.dispatch(navigateAction)
        // const navigate = this.props.navigation.navigate;
        // navigate('AddContact');
    }

    _onModeifyButtonClick() {
        const navigate = this.props.navigation.navigate;
        navigate('ModifyContact');
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

    _renderRow(rowData, sectionID, rowID) {
        // console.log(rowData);
        return (
            <TouchableNativeFeedback onPress={() => {
                this._onRowPress(rowData);
            }}>
                <View style={styles.linkman}>
                    <Text style={styles.nameText}>{rowData.name}</Text>
                    <View style={styles.linkmanlist}>
                        <Image style={styles.linkmanImage} source={require('../img/icon_phone.png')}/>
                        <Text>  {rowData.phone}</Text>
                    </View>
                    <View style={styles.linkmanlist}>
                        <Image style={styles.linkmanImage} source={require('../img/icon_address.png')}/>
                        <Text>  {rowData.address}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}


const styles = StyleSheet.create({
    Page: {
        flex: 1,
    },
    linkman: {
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        padding: 20
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    linkmanlist: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    linkmanImage: {
        width: 16,
        height: 16
    }


});