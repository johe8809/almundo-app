import React, { Component } from 'react'
import { View, Text, TouchableOpacity, DatePickerAndroid, Platform, Keyboard, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Sugar from 'sugar'
import InputCustom from '../InputCustom';
import { iconCalendar } from '../IconCustom';

const DatePicker = ({ placeholder, dateValue, onChangeText }) => {
    const showAndroidDatePicker = async () => {
        Keyboard.dismiss();
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                minDate: new Date(),
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = `${year}-${month + 1}-${day}`;
                const dateSelected = Sugar.Date(date).format('{dd} {mon} {yyyy}', 'es');
                onChangeText(dateSelected.raw);
            }
        } catch ({ code, message }) {
            Alert.alert(
                'Error',
                `${message}`,
                [{ text: 'Cancelar' }],
                { cancelable: true }
            )
        }
    }
    return (
        <InputCustom placeholder={placeholder} onFocus={() => showAndroidDatePicker()}
            value={dateValue} icon={iconCalendar} />
    )

}
export default DatePicker;