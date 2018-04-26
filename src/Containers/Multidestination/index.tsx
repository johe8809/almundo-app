import React, { Component } from 'react';
import { View, DatePickerAndroid, Keyboard, TouchableOpacity, Text, ScrollView } from 'react-native';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { getFlights } from '../../Api';
import { citiesArr } from '../../Api/cities';
import { styles } from './style';
import MultidestinationForm from '../../Components/MultidestinationForm';

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
    cities: [],
    openForm: false,
    flightsAdded: [],
    disabledButton: false
};

export default class Multidestination extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
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
        let flights = [];
        const { flightsAdded } = this.state;

        for (let i = 0; i < flightsAdded.length; i++) {
            const { origin, destination, dateDeparture } = flightsAdded[i];
            const dateDep = Sugar.Date(dateDeparture).format('{yyyy}-{MM}-{dd}').raw;
            const params = {
                origin: origin.iata,
                destination: destination.iata,
                dateDeparture: dateDep
            }
            const response = await getFlights(Sugar.Object.toQueryString(params));
            for (let j = 0; j < response.length; j++) {
                const item = response[j];
                flights.push(item);
            }
        }
        console.log(flights);

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
    openFormAddFlight(openForm) {
        this.setState({
            openForm,
            disabledButton: true
        });
    }
    addFlight() {
        const { flightsAdded } = this.state;
        flightsAdded.push(this.state);
        const stateInitial = Sugar.Object.filter(initialState, (item) => item !== flightsAdded);
        this.setState(stateInitial);
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
        const { disabledButton, openForm, focusOrigin, flightsAdded, origin, destination, dateDeparture } = this.state;
        const disabledAccept = !origin.iata || !destination.iata || !dateDeparture;
        return (
            <View style={styles.container}>
                <View showsVerticalScrollIndicator={false}>
                    {flightsAdded.map((item, index) => {
                        return (
                            <View key={index.toString()}>
                                <View style={styles.titleTypeFlight}>
                                    <IconMaterialIcons
                                        name={'flight'}
                                        color="rgba(255, 255, 255, 1)"
                                        size={14} />
                                    <Text style={styles.titleFlight}>{` Vuelo ${index + 1}`}</Text>
                                </View>
                            </View>)
                    })
                    }
                </View>
                {openForm === true &&
                    <View>
                        <MultidestinationForm
                            onFocus={this.onFocus}
                            addFlight={this.addFlight}
                            searchCity={this.searchCity}
                            renderCities={this.renderCities}
                            showAndroidDatePickerDeparture={this.showAndroidDatePickerDeparture}
                            cancelSearch={this.cancelSearch}
                            {...this.state}
                        />
                        {focusOrigin === true &&
                            <TouchableOpacity style={[styles.tab, disabledAccept && styles.buttonDisabled]}
                                disabled={disabledAccept} onPress={() => this.addFlight()}>
                                <IconFontAwesome name={'check-circle'} style={styles.iconTab} />
                                <Text style={styles.textTab}>{'ACEPTAR'}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                }
                {focusOrigin === true &&
                    <View>
                        <TouchableOpacity style={[styles.tab, disabledButton && styles.buttonDisabled]}
                            disabled={disabledButton} onPress={() => this.openFormAddFlight(true)}>
                            <IconFontAwesome name={'plus'} style={styles.iconTab} />
                            <Text style={styles.textTab}>{'AGREGAR VUELO'}</Text>
                        </TouchableOpacity>
                    </View>
                }
                {flightsAdded.length > 0 &&
                    <View>
                        <TouchableOpacity style={[styles.tab]} onPress={() => this.searchFlights()}>
                            <Text style={styles.textTab}>{'BUSCAR'}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}