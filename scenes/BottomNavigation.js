/**
 * Created by 七七 on 2017/4/21.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './HomeScene'
import MyServices from './MyServices'
import MyCenter from './MyCenter'
export default class BottomNavigation extends React.Component {
    static navigationOptions = {
        title: '爱尔生活'
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            mytoken: ''
        };
    };
    render() {
        return (
            <View style={styles.page}>
                <TabNavigator>
                    <TabNavigator.Item
                        title="首页"
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={styles.selectedTabText}
                        titleStyle={styles.tabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../img/ic_nor_home.png")}/>}
                        renderSelectedIcon={() => <Image style={styles.icon}
                                                         source={require("../img/ic_press_home.png")}/>}
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <Home {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="我的服务"
                        selected={this.state.selectedTab === 'myServices'}
                        selectedTitleStyle={styles.selectedTabText}
                        titleStyle={styles.tabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../img/ic_nor_service.png")}/>}
                        renderSelectedIcon={() => <Image style={styles.icon}
                                                         source={require("../img/ic_press_service.png")}/>}
                        onPress={() => this.setState({selectedTab: 'myServices'})}>
                        <MyServices {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="个人中心"
                        selected={this.state.selectedTab === 'myCenter'}
                        selectedTitleStyle={styles.selectedTabText}
                        titleStyle={styles.tabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../img/ic_nor_me.png")}/>}
                        renderSelectedIcon={() => <Image style={styles.icon}
                                                         source={require("../img/ic_press_me.png")}/>}
                        onPress={() => this.setState({selectedTab: 'myCenter'})}>
                        <MyCenter {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    tabText: {
        color: "#999999",
        fontSize: 13
    },
    selectedTabText: {
        color: "#000000",
        fontSize: 13
    },
    icon: {
        width: 23,
        height: 23
    }
});