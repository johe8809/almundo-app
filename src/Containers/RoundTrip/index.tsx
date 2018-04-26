import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Keyboard, DatePickerAndroid, FlatList } from 'react-native';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { getFlights } from '../../Api';
import { citiesArr } from '../../Api/cities';
import RoundTripForm from '../../Components/RoundTripForm';
import InputCustom from '../../Components/InputCustom';
import { styles } from './style';

export default class RoundTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: 'CLO',
            dateDeparture: '08 May 2018',
            dateArrival: '12 May 2018',
            focusOrigin: true,
            cities: []
        }
        this.onFocusOrigin = this.onFocusOrigin.bind(this);
        this.onChangeTextOrigin = this.onChangeTextOrigin.bind(this);
        this.searchFlights = this.searchFlights.bind(this);
        this.searchCity = this.searchCity.bind(this);
        this.selectCity = this.selectCity.bind(this);
        this.showAndroidDatePickerDeparture = this.showAndroidDatePickerDeparture.bind(this);
        this.showAndroidDatePickerArrival = this.showAndroidDatePickerArrival.bind(this);
    }
    async showAndroidDatePickerDeparture() {
        Keyboard.dismiss();
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
        Keyboard.dismiss();
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
        const { origin, destination, dateDeparture, dateArrival } = this.state;
        const dateDep = Sugar.Date(dateDeparture).format('{yyyy}-{MM}-{dd}').raw;
        const dateArr = Sugar.Date(dateArrival).format('{yyyy}-{MM}-{dd}').raw;

        const params = {
            origin,
            destination,
            dateDeparture: dateDep
        }
        const paramsArrival = {
            origin: destination,
            destination: origin,
            dateArrival: dateArr
        }
        const flights = await getFlights(Sugar.Object.toQueryString(params));
        const flightsArrival = await getFlights(Sugar.Object.toQueryString(paramsArrival));

        Actions.flightsResultSearch({ flights, flightsArrival });
    }
    onFocusOrigin() {
        this.setState({ focusOrigin: !this.state.focusOrigin });
    }
    onChangeTextOrigin(text) {
        this.setState({ origin: text });
    }
    searchCity(text) {
        this.setState({ origin: text })
        const cities = citiesArr.filter((item) => {
            return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
        this.setState({
            origin: text,
            cities
        })
    }
    selectCity(city) {
        // Keyboard.dismiss();
        this.setState({
            origin: `${city.iata} - ${city.name}`
        });
    }
    render() {
        const { focusOrigin } = this.state;
        const iconSearch = () => <IconFontAwesome name={'search'} color="rgba(180, 180, 180, 1)" size={22} />;
        return (
            <View style={styles.container}>
                {focusOrigin ?
                    <RoundTripForm
                        onFocusOrigin={this.onFocusOrigin}
                        onChangeTextOrigin={this.onChangeTextOrigin}
                        searchFlights={this.searchFlights}
                        showAndroidDatePickerDeparture={this.showAndroidDatePickerDeparture}
                        showAndroidDatePickerArrival={this.showAndroidDatePickerArrival}
                        {...this.state}
                    /> :
                    <View>
                        <InputCustom onChangeText={this.searchCity} icon={iconSearch} />
                        <FlatList
                            data={this.state.cities}
                            keyExtractor={(item) => item.iata}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={this.selectCity(item)} style={styles.itemCity}>
                                        <Text>{`${item.iata} - ${item.name}`}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>}
            </View>
        )
    }
}