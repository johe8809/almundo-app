import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import InputCustom from '../InputCustom';
import { styles } from './style';

const MultidestinationForm = (props) => {
    const {
        onFocus,
        searchCity,
        showAndroidDatePickerDeparture,
        origin,
        destination,
        dateDeparture,
        cities,
        renderCities,
        focusOrigin,
        fieldSearch,
        cancelSearch
    } = props;

    const iconOrgin = () => <IconEndtypo name={'aircraft-take-off'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconDestination = () => <IconEndtypo name={'aircraft-landing'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconCalendar = () => <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconBack = () => {
        return <IconMaterialIcons name={'arrow-back'} color="rgba(180, 180, 180, 1)"
            onPress={() => cancelSearch(fieldSearch)} size={24} />;
    }

    return (
        <View>
            {focusOrigin ?
                <View>
                    <InputCustom placeholder={'Ciudad de origen'} onFocus={() => onFocus('origin')} icon={iconOrgin}
                        onChangeText={(text) => searchCity(text, 'origin')} value={`${origin.name}`} />
                    <InputCustom placeholder={'Ciudad destino'} onFocus={() => onFocus('destination')}
                        icon={iconDestination} onChangeText={(text) => searchCity(text, 'destinationa')}
                        value={`${destination.name}`} />
                    <InputCustom placeholder={'Fecha salida'} onFocus={showAndroidDatePickerDeparture}
                        value={dateDeparture} icon={iconCalendar} />
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
export default MultidestinationForm;