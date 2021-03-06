import React, { Component } from 'react';
import { View, DatePickerAndroid, Keyboard } from 'react-native';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import { getFlights } from '../../Api';
import { citiesArr } from '../../Api/cities';
import { styles } from './style';
import RoundTripForm from '../../Components/RoundTripForm';

const initialState = {
    origin: {
        iata: '',
        name: ''
    },
    destination: {
        iata: '',
        name: ''
    },
    dateDeparture: '',
    dateArrival: '',
    focusOrigin: true,
    fieldSearch: '',
    cities: []
};

export default class RoundTrip extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onFocus = this.onFocus.bind(this);
        this.searchFlights = this.searchFlights.bind(this);
        this.showAndroidDatePicker = this.showAndroidDatePicker.bind(this);
        this.searchCity = this.searchCity.bind(this);
        this.renderCities = this.renderCities.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
    }
    async showAndroidDatePicker(field) {
        Keyboard.dismiss();
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                minDate: new Date(),
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = `${year}-${month + 1}-${day}`;
                const dateSelected = Sugar.Date(date).format('{dd} {mon} {yyyy}', 'es');
                this.setState({ [field]: dateSelected.raw })
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
            origin: origin.iata,
            destination: destination.iata,
            dateDeparture: dateDep
        }
        const paramsArrival = {
            origin: destination.iata,
            destination: origin.iata,
            dateArrival: dateArr
        }
        const flights = await getFlights(Sugar.Object.toQueryString(params));
        const flightsArrival = await getFlights(Sugar.Object.toQueryString(paramsArrival));

        Actions.flightsResultSearch({ flights, flightsArrival });
    }
    onFocus(field) {
        Actions.refresh({ hideNavBar: true });
        this.setState({
            focusOrigin: !this.state.focusOrigin,
            [field]: '',
            fieldSearch: field
        });
    }
    searchCity(text, field) {
        const cities = citiesArr.filter((item) => {
            return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
        this.setState({
            [field]: text,
            cities
        });
    }
    renderCities(city, field) {
        Actions.refresh({ hideNavBar: false });
        this.setState({
            [field]: city,
            focusOrigin: true,
            cities: []
        });
    }
    cancelSearch(field) {
        Keyboard.dismiss();
        Actions.refresh({ hideNavBar: false });
        this.setState({
            [field]: initialState[field],
            focusOrigin: true,
            cities: []
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <RoundTripForm
                    onFocus={this.onFocus}
                    searchFlights={this.searchFlights}
                    searchCity={this.searchCity}
                    renderCities={this.renderCities}
                    showAndroidDatePicker={this.showAndroidDatePicker}
                    cancelSearch={this.cancelSearch}
                    {...this.state}
                />
            </View>
        )
    }
}