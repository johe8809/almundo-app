import React, { Component } from 'react';
import { View, DatePickerAndroid, Keyboard } from 'react-native';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import { PropsOneWay as Props, StateOneWay as State } from '../../Interfaces/OneWay';
import { getFlights } from '../../Api';
import { citiesArr } from '../../Api/cities';
import { styles } from './style';
import OneWayForm from '../../Components/OneWayForm';

export default class OneWay extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = Object.assign(this.initialState);
        this.onFocus = this.onFocus.bind(this);
        this.searchFlights = this.searchFlights.bind(this);
        this.searchCity = this.searchCity.bind(this);
        this.renderCities = this.renderCities.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
        this.setDateDeparture = this.setDateDeparture.bind(this);
    }
    get initialState() {
        return {
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
            [field]: this.initialState[field],
            focusOrigin: true,
            cities: []
        });
    }
    setDateDeparture(text) {
        this.setState({ dateDeparture: text });
    }
    render() {
        return (
            <View style={styles.container}>
                <OneWayForm
                    onFocus={this.onFocus}
                    searchFlights={this.searchFlights}
                    searchCity={this.searchCity}
                    renderCities={this.renderCities}
                    cancelSearch={this.cancelSearch}
                    setDateDeparture={this.setDateDeparture}
                    {...this.state}
                />
            </View>
        )
    }
}