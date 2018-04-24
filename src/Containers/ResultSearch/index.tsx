import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { getFlights } from '../../Api';
import { styles } from './style';

const data = [
    {
        id: "5adbe5a1f36d2856dd5755ee",
        destination: {
            iata: "BUE",
            name: "Buenos Aires"
        },
        origin: {
            iata: "BOG",
            name: "Bogotá"
        },
        dateDeparture: "May 05",
        hourDeparture: "05:20",
        dateArrival: "May 06",
        hourArrival: "14:30",
        image: "https://thecitypaperbogota.com/wp-content/uploads/2017/06/NetoGonzalez.jpg",
        price: "COP 2'234.994",
        segments: "Panamá"
    },
    {
        id: "5adcf64cf36d2856dd577caf",
        destination: {
            iata: "MDE",
            name: "Medellin"
        },
        origin: {
            iata: "CLO",
            name: "Cali"
        },
        dateDeparture: "May 07",
        hourDeparture: "10:30",
        dateArrival: "May 07",
        hourArrival: "12:20",
        image: "https://thecitypaperbogota.com/wp-content/uploads/2017/06/NetoGonzalez.jpg",
        price: "COP 435.233",
        segments: "Medellin-Bogota"
    }
];

export default class ResultSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        }
    }
    componentDidMount() {
        getFlights().then(response => {
            this.setState({ flights: response });
        });
    }
    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.titleTypeFlight}>
                    <IconMaterialIcons
                        name={'arrow-forward'}
                        color="rgba(255, 255, 255, 1)"
                        size={14} />
                    <Text style={styles.titleFlight}>{' Ida'}</Text>

                </View>
                <FlatList
                    data={this.state.flights}
                    // extraData={this.state.offers}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => Actions.home()}>
                                <View style={styles.priceContent}>
                                    <Text style={styles.price}>{item.price}</Text>
                                </View>
                                <View style={styles.containerI}>
                                    <View style={styles.flightDatetime}>
                                        <Text style={styles.iata}>{item.destination.iata}</Text>
                                        <Text style={styles.datetime}>{`Sale ${item.dateDeparture}`}</Text>
                                        <Text style={styles.datetime}>{item.hourDeparture}</Text>
                                    </View>
                                    <View style={styles.arrow}>
                                        <IconEndtypo name={'arrow-long-right'} color="rgba(97, 97, 97, 1)" size={24}
                                            style={{ textAlign: 'center' }} />
                                    </View>
                                    <View style={styles.flightDatetime}>
                                        <Text style={styles.iata}>{item.origin.iata}</Text>
                                        <Text style={styles.datetime}>{`Llega ${item.dateArrival}`}</Text>
                                        <Text style={styles.datetime}>{item.hourArrival}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
        )
    }
};
