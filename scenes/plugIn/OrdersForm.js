/**
 * Created by 七七 on 2017/4/23.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
export default class OrdersForm extends React.Component {
    render() {
        return (
            <View style={styles.OrdersFormStyle}>
                <View style={styles.patientLine}>
                    <View style={styles.lineItem}>
                        <Text>2016-12-02 </Text>
                        <Text>11:25 </Text>
                        <Text> 斯大林</Text>
                    </View>
                    <View>
                        <Text>加急预约</Text>
                    </View>
                </View>
                <View style={styles.doctorLine}>
                    <View style={styles.lineItem}>
                        <Text>德国骨科 </Text>
                        <Text> 元首 </Text>
                        <Text>(工号110)</Text>
                    </View>
                    <View>
                        <Text style={styles.prices}>￥0.01</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    lineItem:{
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    prices:{
        color:'#ff0000'
    }
});