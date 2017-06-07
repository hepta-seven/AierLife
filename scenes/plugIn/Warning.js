/**
 * Created by 七七 on 2017/4/24.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Text,
} from 'react-native'

export default class Warning extends React.Component {
    render() {
        return (
            <View style={styles.Page}>
                <Text style={styles.Warning}>温馨提示</Text>
                <Text>{this.props.text}</Text>
                <Text>{this.props.textTwo}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Page: {
        borderWidth:1,
        borderColor:'#dddddd',
        paddingHorizontal: 5,
        paddingVertical:12,
        backgroundColor:'#ffffff',
        margin:5,
    },
    Warning:{
        marginBottom:13
    }
});