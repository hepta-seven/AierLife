/**
 * Created by 七七 on 2017/4/21.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';

export default class DoctorIntroduction extends React.Component {
    render() {
        let doctor = [
            {
                id:'0',
                doctorPhoto: require('../../img/a044ad345982b2b7bb37f77538adcbef77099bd3.jpg'),
                doctorName: '川普',
                doctorAdministrativeOffice: '精神',
                doctorOffice: '医师',
                doctorHospital: '地球online主刀医师',
                doctorResume: '刚刚就业，准备向中东开刀啊哈哈哈哈哈呵呵呵'
            }, {
                id:'1',
                doctorPhoto: require('../../img/a044ad345982b2b7bb37f77538adcbef77099bd3.jpg'),
                doctorName: '奥巴马',
                doctorAdministrativeOffice: '精神',
                doctorOffice: '医师',
                doctorHospital: '地球online主刀医师',
                doctorResume: '刚刚就业，准备向中东开刀啊哈哈哈哈哈呵呵呵'
            }, {
                id:'2',
                doctorPhoto: require('../../img/a044ad345982b2b7bb37f77538adcbef77099bd3.jpg'),
                doctorName: '希拉里',
                doctorAdministrativeOffice: '精神',
                doctorOffice: '医师',
                doctorHospital: '地球online主刀医师',
                doctorResume: '刚刚就业，准备向中东开刀啊哈哈哈哈哈呵呵呵'
            }, {
                id:'3',
                doctorPhoto: require('../../img/a044ad345982b2b7bb37f77538adcbef77099bd3.jpg'),
                doctorName: '林肯',
                doctorAdministrativeOffice: '精神',
                doctorOffice: '医师',
                doctorHospital: '地球online主刀医师',
                doctorResume: '刚刚就业，准备向中东开刀啊哈哈哈哈哈呵呵呵'
            }];
        return (
            <View>{
                doctor.map(function (item) {
                    return (
                        <View style={styles.doctorIntroductions} key={item.id}>
                            <View>
                                <Image style={styles.doctorPhoto}
                                       source={item.doctorPhoto}/>
                            </View>
                            <View style={styles.doctorIntroductionText}>
                                <View style={styles.doctorIntroductionTextNameAndOffice}>
                                    <Text style={styles.doctorIntroductionTextName}>{item.doctorName}</Text>
                                    <Text
                                        style={styles.doctorIntroductionTextOffice}>{item.doctorAdministrativeOffice} {item.doctorOffice}</Text>
                                </View>
                                <View>
                                    <Text style={styles.doctorHospital}>{item.doctorHospital}</Text>
                                </View>
                                <View>
                                    <Text style={styles.doctorResume}>{item.doctorResume}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    doctorIntroductions: {
        marginTop: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    doctorIntroductionText: {
        paddingHorizontal: 20,
        width: '85%'
    },
    doctorIntroductionTextNameAndOffice: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    doctorIntroductionTextName: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    doctorIntroductionTextOffice: {
        paddingHorizontal: 20,
    },
    doctorHospital: {
        paddingVertical: 5,
        color: '#444444'
    },
    doctorResume: {
        fontSize: 12
    },
    doctorPhoto: {
        width: 70,
        height: 90
    }
});