import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { styles } from './styles';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.tab} onPress={() => Actions.flightsOneWay()}>
                    <IconMaterialIcons name={'arrow-forward'} style={styles.iconTab} />
                    <Text style={styles.textTab}>{'IDA'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => Actions.flightsRoundTrip()}>
                    <IconMaterialIcons name={'compare-arrows'} style={styles.iconTab} />
                    <Text style={styles.textTab}>{'IDA Y VUELTA'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => Actions.flightsMultidestination()} >
                    <IconMaterialIcons name={'list'} style={styles.iconTab} />
                    <Text style={styles.textTab}>{'MULTIDESTINO'}</Text>
                </TouchableOpacity>
            </View>);
    }
};