/**
 * Created by 七七 on 2017/4/26.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Text,
    Image
} from 'react-native'
import CheckBox from 'react-native-check-box'
export default class ChannelOfDisbursement extends React.Component {
    _onCheckBox() {
        console.log('test');
    }

    render() {
        return (
            <View >
                <View style={styles.Pay}>
                    <View style={styles.PayImgPadding}>
                        <Image style={styles.PayImg} source={this.props.Img}/>
                    </View>
                    <View style={styles.PayName}>
                        <Text>{this.props.name}</Text>
                        <Text>{this.props.versions}</Text>
                    </View>
                    <View style={styles.PayCheckBox}>
                        <CheckBox onClick={this._onCheckBox.bind(this)}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Pay: {
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    PayImgPadding: {
        paddingHorizontal: 16,
    },
    PayImg: {
        width: 42,
        height: 42,
    },
    PayName: {
        width: '70%'
    },
    PayCheckBox: {
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
    }
});