import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import InputCustom from '../InputCustom';
import { iconOrgin, iconDestination, iconCalendar } from '../../Helpers';
import { styles } from './style';

const OneWayForm = (props) => {
    const {
        onFocus,
        searchCity,
        searchFlights,
        showAndroidDatePicker,
        origin,
        destination,
        dateDeparture,
        cities,
        renderCities,
        focusOrigin,
        fieldSearch,
        cancelSearch
    } = props;

    const disabledButton = !origin.iata || !destination.iata || !dateDeparture;
    const iconBack = () => {
        return (<IconMaterialIcons name={'arrow-back'} color="rgba(180, 180, 180, 1)"
            onPress={() => cancelSearch(fieldSearch)} size={24} />);
    }

    return (
        <View>
            {focusOrigin ?
                <View>
                    <InputCustom placeholder={'Ciudad de origen'} onFocus={() => onFocus('origin')} icon={iconOrgin}
                        onChangeText={(text) => searchCity(text, 'origin')}
                        value={`${origin.name}`} />
                    <InputCustom placeholder={'Ciudad destino'} onFocus={() => onFocus('destination')}
                        icon={iconDestination} onChangeText={searchCity}
                        value={`${destination.name}`} />
                    <InputCustom placeholder={'Fecha salida'} onFocus={() => showAndroidDatePicker('dateDeparture')}
                        value={dateDeparture} icon={iconCalendar} />
                    <View style={styles.btnSearchContainer}>
                        <TouchableOpacity
                            style={[styles.btnSearch, disabledButton && styles.buttonDisabled]}
                            disabled={disabledButton}
                            onPress={searchFlights}>
                            <Text style={styles.textTab}>{'BUSCAR'}</Text>
                        </TouchableOpacity>
                    </View>
                </View> :
                <View>
                    <InputCustom icon={iconBack}
                        onChangeText={(text) => searchCity(text, fieldSearch)} />
                    <FlatList
                        data={cities}
                        keyExtractor={(item) => item.iata}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => renderCities(item, fieldSearch)}
                                    style={styles.itemCity}>
                                    <Text>{`${item.iata} - ${item.name}`}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>}
        </View>
    )
};
export default OneWayForm;