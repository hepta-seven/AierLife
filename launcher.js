/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableHighlight,
    Navigator
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import LoginScene from './scenes/LoginScene';
import BottomNavigation from './scenes/BottomNavigation';
import ResetPasswordScene from './scenes/ResetPasswordScene';
import SignUpScene from './scenes/SignUpScene';
import FamilyContact from './scenes/FamilyContact';
import OutpatientScene from './scenes/OutpatientScene';
import ClinicIntro from './scenes/ClinicIntro';
import ClinicLocation from './scenes/ClinicLocation';
import PersonalInfo from './scenes/PersonalInfo';
import MyOrderScene from './scenes/MyOrderScene';
import PostSlaughterScene from './scenes/PostSlaughterScene';
import DetailsDoctor from './scenes/DetailsDoctor';
import AddContact from './scenes/AddContact';
import ModifyContact from './scenes/ModifyContact';
import DiseaseDescriptionScene from './scenes/DiseaseDescriptionScene'
import PayScene from './scenes/PayScene';
import TestPing from './scenes/TestPing';


const AierLife = StackNavigator({

    LoginScene: {screen: LoginScene},
    BottomNavigation: {screen: BottomNavigation},
    ResetPasswordScene: {screen: ResetPasswordScene},
    SignUpScene: {screen: SignUpScene},
    FamilyContact: {screen: FamilyContact},
    OutpatientScene: {screen: OutpatientScene},
    ClinicLocation: {screen: ClinicLocation},
    ClinicIntro: {screen: ClinicIntro},
    PersonalInfo: {screen: PersonalInfo},
    MyOrderScene: {screen: MyOrderScene},
    PostSlaughterScene: {screen: PostSlaughterScene},
    DetailsDoctor: {screen: DetailsDoctor},
    AddContact: {screen: AddContact},
    ModifyContact: {screen: ModifyContact},
    DiseaseDescriptionScene: {screen: DiseaseDescriptionScene},
    PayScene: {screen: PayScene},
    TestPing: {screen: TestPing},
});


AppRegistry.registerComponent('AierLife', () => AierLife);
