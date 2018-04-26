import React from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './style';

const InputCustom = (props) => {
    const { placeholder, onFocus, onChangeText, value, onPress } = props;
    const Icon = props.icon;

    return (
        <View style={styles.containerInput}>
            <Icon onPress={onPress} />
            <TextInput style={styles.textInput}
                placeholderTextColor={'rgba(180, 180, 180, 1)'}
                placeholder={placeholder}
                underlineColorAndroid={'rgba(180, 180, 180, 1)'}
                onFocus={onFocus}
                onChangeText={onChangeText}
                value={value} />
        </View>
    )
}
export default InputCustom;