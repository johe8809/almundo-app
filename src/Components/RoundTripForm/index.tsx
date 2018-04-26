import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import InputCustom from '../InputCustom';
import { styles } from './style';

const RoundTripForm = (props) => {
    const {
        onFocusOrigin,
        onChangeTextOrigin,
        searchFlights,
        showAndroidDatePickerDeparture,
        showAndroidDatePickerArrival,
        origin,
        destination,
        dateDeparture,
        dateArrival
    } = props;

    const disabledButton = !origin && !destination && !dateDeparture && !dateArrival;
    const iconOrgin = () => <IconEndtypo name={'aircraft-take-off'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconDestination = () => <IconEndtypo name={'aircraft-landing'} color="rgba(180, 180, 180, 1)" size={24} />;
    const iconCalendar = () => <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />;

    return (
        <View>
            <InputCustom onFocus={onFocusOrigin} onChangeText={onChangeTextOrigin} value={origin} icon={iconOrgin} />
            <InputCustom onFocus={onFocusOrigin} onChangeText={onChangeTextOrigin} value={destination}
                icon={iconDestination} />
            <InputCustom onFocus={showAndroidDatePickerDeparture} value={dateDeparture} icon={iconCalendar} />
            <InputCustom onFocus={showAndroidDatePickerArrival} value={dateArrival} icon={iconCalendar} />
            <View style={styles.btnSearchContainer}>
                <TouchableOpacity
                    style={[styles.btnSearch, disabledButton && styles.buttonDisabled]}
                    disabled={disabledButton}
                    onPress={searchFlights}>
                    <Text style={styles.textTab}>{'BUSCAR'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};
export default RoundTripForm;