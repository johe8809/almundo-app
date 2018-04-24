import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';

export default class RoundTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: ''
        }
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
                        // onChangeText={(text) => this.setState({ text })}
                        value={this.state.origin} />
                </View>
                <View style={styles.containerInput}>
                    <IconEndtypo name={'aircraft-landing'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Ciudad destino'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        // onChangeText={(text) => this.setState({ text })}
                        value={this.state.origin} />
                </View>
                <View style={styles.containerInput}>
                    <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Fecha salida'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        // onChangeText={(text) => this.setState({ text })}
                        value={this.state.origin} />
                </View>
                <View style={styles.containerInput}>
                    <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />
                    <TextInput style={styles.textInput}
                        placeholderTextColor={'rgba(180, 180, 180, 1)'}
                        placeholder={'Fecha llegada'}
                        underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                        // onChangeText={(text) => this.setState({ text })}
                        value={this.state.origin} />
                </View>
                <View style={styles.btnSearchContainer}>
                    <TouchableOpacity style={styles.btnSearch} onPress={() => Actions.flightsResultSearch()}>
                        <IconMaterialIcons name={'search'} style={styles.iconTab} />
                        <Text style={styles.textTab}>{'BUSCAR'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};