import React, { Component } from 'react';
import { View, DatePickerAndroid, Keyboard, TouchableOpacity, Text, ScrollView } from 'react-native';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { PropsMultidestination as Props, StateMultidestination as State } from '../../Interfaces/Multidestination';
import { getFlights } from '../../Api';
import { citiesArr } from '../../Api/cities';
import { styles } from './style';
import MultidestinationForm from '../../Components/MultidestinationForm';

export default class Multidestination extends Component<Props, State> {
    constructor(props: Props) {
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
            origin: { iata: '', name: '' },
            destination: { iata: '', name: '' },
            dateDeparture: '',
            focusOrigin: true,
            fieldSearch: '',
            cities: [],
            openForm: false,
            disabledButton: false,
            flightsAdded: []
        }
    }
    async searchFlights() {
        let flights = [];
        let flights2 = [];
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
        const _initialState: any = this.initialState;
        delete _initialState[`flightsAdded`];
        this.setState(_initialState);
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
        const { disabledButton, openForm, focusOrigin, flightsAdded, origin, destination, dateDeparture } = this.state;
        const disabledAccept = !origin || !destination || !dateDeparture;
        return (
            <View style={styles.container}>
                {focusOrigin === true &&
                    <View>
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
                }
                {openForm === true &&
                    <View>
                        <MultidestinationForm
                            onFocus={this.onFocus}
                            addFlight={this.addFlight}
                            searchCity={this.searchCity}
                            renderCities={this.renderCities}
                            cancelSearch={this.cancelSearch}
                            setDateDeparture={this.setDateDeparture}
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
                {flightsAdded.length > 0 && focusOrigin === true &&
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