import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from '../Containers/Home';
import OneWay from '../Containers/OneWay';
import ResultSearch from '../Containers/ResultSearch';
import RoundTrip from '../Containers/RoundTrip';
import Multidestination from '../Containers/Multidestination';
import DetailFlight from '../Containers/DetailFlight';

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
                    <Scene key="flightsMultidestination" component={Multidestination} title="Multidestino" />
                    <Scene key="flightsResultSearch" component={ResultSearch} title="Elegir vuelos" />
                    <Scene key="flightDetail" component={DetailFlight} title="Detalle" />
                </Scene>
            </Router>
        );
    }
}