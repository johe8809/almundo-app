import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard, DatePickerAndroid } from 'react-native';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import { getFlights } from '../../Api';
import { styles } from './style';

export default class RoundTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: 'MDE',
            destination: 'CLO',
            dateDeparture: '',
            dateArrival: ''
        }
    }
    async showAndroidDatePickerDeparture() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                minDate: new Date(),
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = `${year}-${month + 1}-${day}`;
                const dateSelected = Sugar.Date(date).format('{dd} {mon} {yyyy}', 'es');
                this.setState({ dateDeparture: dateSelected.raw })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    async showAndroidDatePickerArrival() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                minDate: new Date(),
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = `${year}-${month + 1}-${day}`;
                const dateSelected = Sugar.Date(date).format('{dd} {mon} {yyyy}', 'es');
                this.setState({ dateArrival: dateSelected.raw })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    async searchFlights() {
        const dateDeparture = Sugar.Date(this.state.dateDeparture).format('{yyyy}-{MM}-{dd}').raw;
        const dateArrival = Sugar.Date(this.state.dateArrival).format('{yyyy}-{MM}-{dd}').raw;
        const params = {
            origin: this.state.origin,
            destination: this.state.destination,
            dateDeparture,
            dateArrival
        }
        const flights = await getFlights(Sugar.Object.toQueryString(params));
        Actions.flightsResultSearch(flights);
    }
    render() {
        const { origin, destination, dateDeparture, dateArrival } = this.state;
        const disabledButton = !origin || !destination || !dateDeparture || !dateArrival;
        return (
            <View style={styles.container}>
                <View style={styles.containerInput}>
                    <IconEndtypo name={'aircraft-take-off'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Ciudad de origen'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        onChangeText={(text) => this.setState({ origin: text })}
                        value={origin} />
                </View>
                <View style={styles.containerInput}>
                    <IconEndtypo name={'aircraft-landing'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Ciudad destino'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        onChangeText={(text) => this.setState({ destination: text })}
                        value={destination} />
                </View>
                <View style={styles.containerInput}>
                    <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Fecha salida'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        onFocus={() => { Keyboard.dismiss(); this.showAndroidDatePickerDeparture() }}
                        value={dateDeparture} />
                </View>
                <View style={styles.containerInput}>
                    <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Fecha llegada'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        onFocus={() => { Keyboard.dismiss(); this.showAndroidDatePickerArrival() }}
                        value={dateArrival} />
                </View>
                <View style={styles.btnSearchContainer}>
                    <TouchableOpacity
                        style={[styles.btnSearch, disabledButton && styles.buttonDisabled]}
                        disabled={disabledButton}
                        onPress={() => !disabledButton && this.searchFlights()}>
                        <Text style={styles.textTab}>{'BUSCAR'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};