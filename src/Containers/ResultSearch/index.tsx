import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { styles } from './style';
import { PropsResultSearch as Props, StateResultSearch as State } from '../../Interfaces/ResultSearch'
import FlightItem from '../../Components/FlightItem';
import HeaderFlightItem from '../../Components/HeaderFlightItem';
import { iconBack, iconForward, iconArrowLongLeft, iconArrowLongRight } from '../../Components/IconCustom';

export default class ResultSearch extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = this.initialState
    }
    componentDidMount() {
        const { flights, flightsArrival } = this.props;
        this.setState({ flights, flightsArrival });
    }
    get initialState() {
        return {
            flights: [],
            flightsArrival: []
        }
    }
    render() {
        const { flights, flightsArrival } = this.props;

        return (
            <View style={styles.container}>
                {!flights ?
                    <HeaderFlightItem titleFlight={'Vuelos ida'} noResult={true} icon={iconForward} />
                    :
                    <View>
                        <HeaderFlightItem titleFlight={'Vuelos ida'} noResult={false} icon={iconForward} />
                        <FlatList
                            data={flights}
                            extraData={this.state.flights}
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
                                    extraData={this.state}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => <FlightItem item={item} icon={iconArrowLongLeft} />}
                                />
                            </View>
                        }
                    </View>
                }
            </View >
        );
    }
};
