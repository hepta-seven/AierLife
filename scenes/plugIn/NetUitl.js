/**
 * Created by Ramirez on 4/22/2017.
 * NetUitl 网络请求的实现
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';
export default class NetUitl extends React.Component {
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url, params, callback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        console.log(url);
        fetch(url, {
            method: 'GET',
        }).then((response) => {
            console.log(response);
            return response.json()
        }).then((responseData) => {
            callback(responseData);
        }).catch((error) => {
            console.error(error);
        });
    }

    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url, params, callback) {
        console.log(params);
        let res = '';
        for (let i in params) {
            res += '&' + i + '=' + params[i];
        }
        let paramsString = res.substring(1);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: paramsString
        }).then((response) => response.json()
        ).then((responseData) => {
            callback(responseData);
        }).catch((error) => {
            console.error(error);
        });

    }

    static img(url, params, uri, callback) {
        let formData = new FormData();
        let file = {uri: uri, type: 'multipart/form-data', name: 'image.png'};
        formData.append('patient_condition_image', file);
        for (let i in params) {
            formData.append(i, params[i])
        }
        console.log(formData);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json()
        ).then((responseData) => {
            callback(responseData);
        }).catch((error) => {
            console.error(error);
        });
    }
}