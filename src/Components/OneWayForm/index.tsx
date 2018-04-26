import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import InputCustom from '../InputCustom';
import { styles } from './style';

const OneWayForm = (props) => {
    const {
        onFocus,
        searchCity,
        searchFlights,
        showAndroidDatePickerDeparture,
        origin,
        destination,
        dateDeparture,
        cities,
        renderCities,
        focusOrigin,
        fieldSearch
    } = props;

    const disabledButton = !origin.iata || !destination.iata || !dateDeparture;
    const iconOrgin = () => <IconEndtypo name={'aircraft-take-off'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconDestination = () => <IconEndtypo name={'aircraft-landing'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconCalendar = () => <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconSearch = () => <IconFontAwesome name={'search'} color="rgba(180, 180, 180, 1)" size={22} />;
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
                    <InputCustom placeholder={'Fecha salida'} onFocus={showAndroidDatePickerDeparture}
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
                    <InputCustom icon={iconSearch}
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