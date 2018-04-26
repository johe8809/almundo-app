import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';

const FlightItem = ({item, icon}) => {
    const { price, destination, hourDeparture, origin, hourArrival, dateDeparture, dateArrival } = item;
    const Icon = icon;
    const dateDep = Sugar.Date(dateDeparture).format('{Mon} {dd}').raw;
    const dateArr = Sugar.Date(dateArrival).format('{Mon} {dd}').raw;
    return (
        <View>
            <TouchableOpacity onPress={() => Actions.flightDetail(item)}>
                <View style={styles.priceContent}>
                    <Text style={styles.price}>{price}</Text>
                </View>
                <View style={styles.containerI}>
                    <View style={styles.flightDatetime}>
                        <Text style={styles.iata}>{destination.iata}</Text>
                        <Text style={styles.datetime}>{`Sale ${dateDep}`}</Text>
                        <Text style={styles.datetime}>{hourDeparture}</Text>
                    </View>
                    <View style={styles.arrow}>
                        <Icon />
                    </View>
                    <View style={styles.flightDatetime}>
                        <Text style={styles.iata}>{origin.iata}</Text>
                        <Text style={styles.datetime}>{`Llega ${dateArr}`}</Text>
                        <Text style={styles.datetime}>{hourArrival}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default FlightItem;