import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Sugar from 'sugar';
import { styles } from './style';

export default class ResultSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        }
    }
    componentDidMount() {
        this.setState({ flights: this.props.data });
    }
    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {!this.state.flights.length ?
                    <View style={styles.noResult}>
                        < Text>{'No hay vuelos disponibles.'}</Text>
                    </View>
                    :
                    <View>
                        <View style={styles.titleTypeFlight}>
                            <IconMaterialIcons
                                name={'arrow-forward'}
                                color="rgba(255, 255, 255, 1)"
                                size={14} />
                            <Text style={styles.titleFlight}>{' Solo ida'}</Text>
                        </View>
                        <FlatList
                            data={this.state.flights}
                            // extraData={this.state.offers}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => {
                                const dateDeparture = Sugar.Date(item.dateDeparture).format('{Mon} {dd}').raw;
                                const dateArrival = Sugar.Date(item.dateArrival).format('{Mon} {dd}').raw;
                                return (
                                    <TouchableOpacity onPress={() => Actions.flightDetail(item)}>
                                        <View style={styles.priceContent}>
                                            <Text style={styles.price}>{item.price}</Text>
                                        </View>
                                        <View style={styles.containerI}>
                                            <View style={styles.flightDatetime}>
                                                <Text style={styles.iata}>{item.destination.iata}</Text>
                                                <Text style={styles.datetime}>{`Sale ${dateDeparture}`}</Text>
                                                <Text style={styles.datetime}>{item.hourDeparture}</Text>
                                            </View>
                                            <View style={styles.arrow}>
                                                <IconEndtypo name={'arrow-long-right'} style={styles.iconArrow} />
                                            </View>
                                            <View style={styles.flightDatetime}>
                                                <Text style={styles.iata}>{item.origin.iata}</Text>
                                                <Text style={styles.datetime}>{`Llega ${dateArrival}`}</Text>
                                                <Text style={styles.datetime}>{item.hourArrival}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                }
            </ScrollView >
        )
    }
};
