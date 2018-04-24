import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from '../Containers/Home';
import OneWay from '../Containers/OneWay';
import ResultSearch from '../Containers/ResultSearch';
import RoundTrip from '../Containers/RoundTrip';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key={'root'}
                    navigationBarStyle={{ backgroundColor: 'rgba(3, 155, 229, 1)' }}
                    navBarButtonColor='white'>
                    <Scene key="home" component={Home} title={'Vuelos'} init={true} initial={true} tintColor='white' />
                    <Scene key="flightsOneWay" component={OneWay} title="Ida" />
                    <Scene key="flightsRoundTrip" component={RoundTrip} title="Ida y vuelta" />
                    <Scene key="flightsResultSearch" component={ResultSearch} title="Elegir vuelos" />
                </Scene>
            </Router>
        );
    }
}