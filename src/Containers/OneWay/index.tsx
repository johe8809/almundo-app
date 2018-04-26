import React, { Component } from 'react';
import { View, DatePickerAndroid, Keyboard } from 'react-native';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import { getFlights } from '../../Api';
import { citiesArr } from '../../Api/cities';
import { styles } from './style';
import OneWayForm from '../../Components/OneWayForm';

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
    focusOrigin: true,
    fieldSearch: '',
    cities: []
};

export default class OneWay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: {
                iata: '',
                name: ''
            },
            destination: {
                iata: '',
                name: ''
            },
            dateDeparture: '',
            focusOrigin: true,
            fieldSearch: '',
            cities: []
        }
        this.onFocus = this.onFocus.bind(this);
        this.searchFlights = this.searchFlights.bind(this);
        this.showAndroidDatePickerDeparture = this.showAndroidDatePickerDeparture.bind(this);
        this.searchCity = this.searchCity.bind(this);
        this.renderCities = this.renderCities.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
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
    async searchFlights() {
        const { origin, destination, dateDeparture } = this.state;
        const dateDep = Sugar.Date(dateDeparture).format('{yyyy}-{MM}-{dd}').raw;
        const params = {
            origin: origin.iata,
            destination: destination.iata,
            dateDeparture: dateDep
        }

        const flights = await getFlights(Sugar.Object.toQueryString(params));
        Actions.flightsResultSearch({ flights })
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
                <OneWayForm
                    onFocus={this.onFocus}
                    searchFlights={this.searchFlights}
                    searchCity={this.searchCity}
                    renderCities={this.renderCities}
                    showAndroidDatePickerDeparture={this.showAndroidDatePickerDeparture}
                    cancelSearch={this.cancelSearch}
                    {...this.state}
                />
            </View>
        )
    }
}