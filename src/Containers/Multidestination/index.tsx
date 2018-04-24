import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';

export default class Multidestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openForm: false,
            origin: '',
            destination: ''
        }
    }
    openFormAddFlight(openForm) {
        this.setState({ openForm })
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.tab} onPress={() => this.openFormAddFlight(true)}>
                    <IconMaterialIcons name={'flight'} style={styles.iconTab} />
                    <Text style={styles.textTab}>{'Elegir vuelo'}</Text>
                </TouchableOpacity>
                {this.state.openForm === true &&
                    <View>
                        <View style={styles.containerInput}>
                            <IconEndtypo name={'aircraft-take-off'} style={styles.icon} />
                            <TextInput style={styles.textInput}
                                placeholderTextColor={'rgba(180, 180, 180, 1)'}
                                placeholder={'Ciudad de origen'}
                                underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                                // onChangeText={(text) => this.setState({ text })}
                                value={this.state.origin} />
                        </View>
                        <View style={styles.containerInput}>
                            <IconEndtypo name={'aircraft-landing'} style={styles.icon} />
                            <TextInput style={styles.textInput}
                                placeholderTextColor={'rgba(180, 180, 180, 1)'}
                                placeholder={'Ciudad destino'}
                                underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                                // onChangeText={(text) => this.setState({ text })}
                                value={this.state.origin} />
                        </View>
                        <View style={styles.containerInput}>
                            <IconFontAwesome name={'calendar'} style={styles.icon} />
                            <TextInput style={styles.textInput}
                                placeholderTextColor={'rgba(180, 180, 180, 1)'}
                                placeholder={'Fecha salida'}
                                underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                                // onChangeText={(text) => this.setState({ text })}
                                value={this.state.origin} />
                        </View>
                    </View>
                }
                <View style={styles.btnSearchContainer}>
                    <TouchableOpacity style={styles.tab} onPress={() => Actions.flightsResultSearch()}>
                        <IconMaterialIcons name={'search'} style={styles.iconTab} />
                        <Text style={styles.textTab}>{'BUSCAR'}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
};