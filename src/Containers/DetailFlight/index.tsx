import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default class DetailFlight extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { destination, dateDeparture, hourDeparture, origin, dateArrival, hourArrival } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.flightDatetime}>
          <Text style={styles.iata}>{destination.iata}</Text>
          <Text style={styles.datetime}>{`Sale ${dateDeparture}`}</Text>
          <Text style={styles.datetime}>{hourDeparture}</Text>
        </View>
        <View style={styles.flightDatetime}>
          <Text style={styles.iata}>{origin.iata}</Text>
          <Text style={styles.datetime}>{`Llega ${dateArrival}`}</Text>
          <Text style={styles.datetime}>{hourArrival}</Text>
        </View>
      </View>
    );
  }
};