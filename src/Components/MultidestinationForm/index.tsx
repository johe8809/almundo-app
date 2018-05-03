import React from 'react';
import { View, Text, TouchableOpacity, FlatList, DatePickerAndroid } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import InputCustom from '../InputCustom';
import DatePicker from '../DatePicker';
import { iconOrgin, iconDestination, iconCalendar } from '../IconCustom';
import { styles } from './style';

const MultidestinationForm = (props) => {
    const {
        onFocus,
        searchCity,
        origin,
        destination,
        dateDeparture,
        cities,
        renderCities,
        focusOrigin,
        fieldSearch,
        cancelSearch,
        setDateDeparture
    } = props;

    const iconBack = () => {
        return (<IconMaterialIcons name={'arrow-back'} color="rgba(180, 180, 180, 1)"
            onPress={() => cancelSearch(fieldSearch)} size={24} />);
    }

    return (
        <View>
            {focusOrigin ?
                <View>
                    <InputCustom placeholder={'Ciudad de origen'} onFocus={() => onFocus('origin')} icon={iconOrgin}
                        onChangeText={(text) => searchCity(text, 'origin')} value={`${origin.name || ''}`} />
                    <InputCustom placeholder={'Ciudad destino'} onFocus={() => onFocus('destination')}
                        icon={iconDestination} onChangeText={(text) => searchCity(text, 'destinationa')}
                        value={`${destination.name || ''}`} />
                    <DatePicker placeholder={'Fecha salida'} dateValue={dateDeparture}
                        onChangeText={(text) => setDateDeparture(text)} />
                </View> :
                <View>
                    <InputCustom icon={iconBack}
                        onChangeText={(text) => searchCity(text, fieldSearch)} />
                    <FlatList
                        data={cities}
                        keyExtractor={(item) => item.iata}
                        renderItem={({ item }) => {
                            const { iata, name } = item;
                            return (
                                <TouchableOpacity onPress={() => renderCities(item, fieldSearch)}
                                    style={styles.itemCity}>
                                    <Text>{`${iata || ''} - ${name || ''}`}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>}
        </View>
    )
};
export default MultidestinationForm;