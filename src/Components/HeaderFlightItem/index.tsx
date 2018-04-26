import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

const HeaderFlightItem = (item) => {
    const { titleFlight, noResult, icon } = item;
    const Icon = icon;
    return (
        <View>
            <View style={styles.titleTypeFlight}>
                <Icon />
                <Text style={styles.titleFlight}>{` ${titleFlight}`}</Text>
            </View>
            {noResult === true &&
                <View style={styles.noResult}>
                    < Text>{'No hay vuelos disponibles.'}</Text>
                </View>
            }
        </View>
    );
};
export default HeaderFlightItem;