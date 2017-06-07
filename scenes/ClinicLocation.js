/**
 * Created by Ramirez on 4/20/2017.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import Dimensions from 'Dimensions';

import {
    StyleSheet,
    View,
    Alert,
    Text,
    Button,
    Image,
    ScrollView
} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class ResetPasswordScene extends React.Component {
    static navigationOptions = {
        title: '诊所地址',
    };

    constructor() {
        super();

        this.state = {
            mayType: MapTypes.NORMAL,
            clinicName: '',
            zoom: 22,
            center: {
                longitude: 108.956,
                latitude: 34.2779,
                title: "后宰门130号创之星大厦一单元122（中户）"
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: 108.924,
                latitude: 34.2448,
                title: "白庙村路伊顿公馆西区2号搂504"
            }, {
                longitude: 108.956,
                latitude: 34.2779,
                title: "后宰门130号创之星大厦一单元122（中户）"
            }]
        };
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.setState(
            {
                center: {
                    longitude: params.longitude,
                    latitude: params.latitude,
                    title: params.address
                },
                clinicName: params.name
            }, () => {
                //   console.log(this.state)
            });
        // this.setState({longitude: params.longitude}, () => {
        //     console.log(this.state)
        // });

    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        // marker={this.state.marker}
                        markers={this.state.markers}
                        style={styles.map}
                        onMarkerClick={(e) => {
                            // console.warn(JSON.stringify(e));
                        }}
                        onMapClick={(e) => {
                        }}
                    >
                    </MapView>
                </View>
                <View style={styles.text}>
                    <Text style={styles.textName}>{this.state.clinicName}</Text>
                    <Text style={styles.textMap}>{this.state.center.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    map: {
        width: Dimensions.get('window').width,
        //Dimensions.get('window').height - 200(下面留空距离)
        height: Dimensions.get('window').height - 200,
    },
    text: {
        borderColor: '#dddddd',
        borderWidth: 1,
        margin: 10,
        backgroundColor: '#ffffff'
    },
    textName: {
        padding: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00B0F0',
        textAlign: 'center'
    },
    textMap: {
        padding: 10,
        fontSize: 20,
        color: '#00B38C',
        textAlign: 'center'

    }
});