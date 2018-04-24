import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from '../Containers/Home';
import OneWay from '../Containers/OneWay';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key={'root'}
                    navigationBarStyle={{ backgroundColor: 'rgba(3, 155, 229, 1)' }}
                    navBarButtonColor='white'>
                    <Scene key="home" component={Home} title={'Vuelos'} init={true} initial={true} tintColor='white' />
                    <Scene key="flightsOneWay" component={OneWay} title="Ida" />
                </Scene>
            </Router>
        );
    }
}