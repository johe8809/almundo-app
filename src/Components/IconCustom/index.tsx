import React from 'react';
import IconEndtypo from 'react-native-vector-icons/dist/Entypo';
import IconFontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { styles } from './style';

export const iconOrgin = () => <IconEndtypo name={'aircraft-take-off'} color="rgba(180, 180, 180, 1)" size={24} />;
export const iconDestination = () => <IconEndtypo name={'aircraft-landing'} color="rgba(180, 180, 180, 1)" size={24} />;
export const iconCalendar = () => <IconFontAwesome name={'calendar'} color="rgba(180, 180, 180, 1)" size={24} />;
export const iconBack = () => <IconMaterialIcons name={'arrow-back'} color="rgba(255, 255, 255, 1)" size={14} />;
export const iconForward = () => <IconMaterialIcons name={'arrow-forward'} color="rgba(255, 255, 255, 1)" size={14} />;
export const iconArrowLongRight = () => <IconEndtypo name={'arrow-long-right'} style={styles.iconArrow} />;
export const iconArrowLongLeft = () => <IconEndtypo name={'arrow-long-left'} style={styles.iconArrow} />;

const TypeIcons = {
    IconEndtypo,
    IconFontAwesome,
    IconMaterialIcons
};

const IconCustom = ({ type, name, size, style }) => {
    const Icon = TypeIcons[type];
    return (
        <Icon name={name} size={size} style={style} />
    );
}
export default IconCustom;