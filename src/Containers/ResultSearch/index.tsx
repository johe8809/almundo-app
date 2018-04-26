import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { styles } from './style';
import FlightItem from '../../Components/FlightItem';
import HeaderFlightItem from '../../Components/HeaderFlightItem';
import { iconBack, iconForward, iconArrowLongLeft, iconArrowLongRight } from '../../Helpers/Components';

export default class ResultSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { flights, flightsArrival } = this.props;
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {!flights.length ?
                    <HeaderFlightItem titleFlight={'Vuelos ida'} noResult={true} icon={iconForward} />
                    :
                    <View>
                        <HeaderFlightItem titleFlight={'Vuelos ida'} noResult={false} icon={iconForward} />
                        <FlatList
                            data={flights}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => <FlightItem item={item} icon={iconArrowLongRight} />}
                        />
                    </View>
                }
                {flightsArrival &&
                    <View>
                        {!flightsArrival ?
                            <HeaderFlightItem titleFlight={'Vuelos regreso'} noResult={true} icon={iconBack} />
                            :
                            <View>
                                <HeaderFlightItem titleFlight={'Vuelos regreso'} noResult={false} icon={iconBack} />
                                <FlatList
                                    data={flightsArrival}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => <FlightItem item={item} icon={iconArrowLongLeft} />}
                                />
                            </View>
                        }
                    </View>
                }
            </ScrollView >
        );
    }
};
