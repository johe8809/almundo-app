import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, DatePickerAndroid, Keyboard } from 'react-native';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Sugar from 'sugar';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';

export default class OneWay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            dateDeparture: ''
        }
    }
    async showAndroidDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                minDate: new Date(),
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = (`${month}-${day}-${year}`);
                const dateSelected = Sugar.Date(date).medium('es');
                this.setState({ dateDeparture: dateSelected.raw })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    searchCities(text) {
        this.setState({ origen: text })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerInput}>
                    <IconEndtypo name={'aircraft-take-off'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Ciudad de origen'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        onChangeText={(text) => this.setState({ origin: text })}
                        value={this.state.origin} />
                </View>
                <View style={styles.containerInput}>
                    <IconEndtypo name={'aircraft-landing'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Ciudad destino'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        onChangeText={(text) => this.setState({ destination: text })}
                        value={this.state.destination} />
                </View>
                <View style={styles.containerInput}>
                    <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Fecha salida'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        onFocus={() => { Keyboard.dismiss(); this.showAndroidDatePicker() }}
                        // onChangeText={(text) => this.setState({ text })}
                        value={this.state.dateDeparture} />
                </View>
                <View style={styles.btnSearchContainer}>
                    <TouchableOpacity style={styles.btnSearch} onPress={() => Actions.home()}>
                        <IconMaterialIcons name={'search'} style={styles.iconTab} />
                        <Text style={styles.textTab}>{'BUSCAR'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}