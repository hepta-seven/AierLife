/**
 * Created by 陈腾飞 on 2017/4/24.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import {NavigationActions} from 'react-navigation';


export default class DoctorMinute extends React.Component {

    render() {
        return (
            <View style={styles.paddingText}>
                <Image
                    style={styles.img}
                    source={require('../../img/head.jpg')}
                />
                <View style={styles.paddingLeftText}>
                    <Text style={styles.titleUserName}>孙医生（工号007）</Text>
                    <Text style={styles.titleOffice}>爱尔诊所后宰门诊室</Text>
                    <Text style={styles.titleOffice}>口腔科 医师</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    paddingText: {
        paddingVertical:7,
        paddingLeft: 14,
        paddingRight: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#dddddd'
    },
    img: {
        width: 70,
        height: 80,
        paddingTop: 12
    },
    paddingLeftText: {
        paddingLeft: 24,
        width: '75%'
    },
    titleUserName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#444444'
    },
    titleOffice: {
        fontSize: 14,
        color: '#444444',
        paddingTop: 12
    },
    heigh: {
        height: '100%'
    },
});