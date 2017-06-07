/**
 * Created by 七七 on 2017/4/25.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableNativeFeedback
} from 'react-native';
export default class ProgressBar extends React.Component {
    render() {
        return (
            <View style={styles.page}>
                <View style={styles.plan}>
                    <Image style={styles.planImg} source={this.props.imgOne}/>
                    <Text>病情描述</Text>
                </View>
                <Image style={styles.HR} source={require('../../img/line.png')}/>
                <View style={styles.plan}>
                    <Image style={styles.planImg} source={this.props.imgTwo}/>
                    <Text>支付</Text>
                </View>
                <Image style={styles.HR} source={require('../../img/line.png')}/>
                <View style={styles.plan}>
                    <Image style={styles.planImg} source={this.props.imgThree}/>
                    <Text>平台确认</Text>
                </View>
                <Image style={styles.HR} source={require('../../img/line.png')}/>
                <View style={styles.plan}>
                    <Image style={styles.planImg} source={this.props.imgFour}/>
                    <Text>医院就诊</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        borderColor:'#dddddd',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    plan: {
        width: 60,
        marginTop: 8,
        alignItems: 'center',
        marginHorizontal: 12,
    },
    planImg: {
        width: 20,
        height: 20,
        marginBottom:8,
    },
    HR: {
        width: 34
    }
});