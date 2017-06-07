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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class ClinicList extends React.Component {
    render() {
        let clinicList = [
            {
                id: 0,
                depName: '修复科(镶牙)',
                docCount: '1',
                intro: '定义齿、活动义齿、全口义齿、牙齿美容、附着体义齿等治疗'
            },
            {
                id: 1,
                depName: '正畸科(矫正)',
                docCount: '3',
                intro: '青少年及成年人牙颌畸形矫治'
            }, {
                id: 2,
                depName: '儿童牙病科',
                docCount: '1',
                intro: '儿童龋病、前牙外伤等的治疗'
            }, {
                id: 3,
                depName: '综合科',
                docCount: '1',
                intro: '不需要转科,接诊医师根据患者具体病情,一人完成患者所需要的补牙、镶牙、牙美容等全部口腔治疗'
            },];
        return (
            <View>{
                clinicList.map(function (item) {
                    return (
                        <View style={styles.doctorIntroductions} key={item.id}>
                            <View style={styles.doctorIntroductionText}>
                                <View style={styles.doctorIntroductionTextNameAndOffice}>
                                    <Text style={styles.doctorIntroductionTextName}>{item.depName}</Text>
                                    <Text
                                        style={styles.doctorIntroductionTextOffice}>{item.docCount}位三甲医师</Text>
                                </View>
                                <View>
                                    <Text style={styles.doctorHospital}>{item.intro}</Text>
                                </View>
                                <View>
                                    <Text style={styles.doctorResume}>{item.doctorResume}</Text>
                                </View>
                            </View>
                            <View style={styles.chevronRight}>
                                <Text><FontAwesomeIcon name="chevron-right"/></Text>
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
        marginTop: 1,
        paddingTop: 17,
        paddingLeft: 15,
        paddingBottom: 19,
        paddingRight: 22,
        paddingHorizontal: 0,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
    },
    doctorIntroductionText: {
        flex: 8,
        paddingHorizontal: 10,
        // width: 100
    },
    chevronRight: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'flex-end',
        // width: 100
    },
    doctorIntroductionTextNameAndOffice: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doctorIntroductionTextName: {
        fontSize: 16,
        color: '#444444',
        fontWeight: 'bold',
    },
    doctorIntroductionTextOffice: {
        paddingHorizontal: 10,
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