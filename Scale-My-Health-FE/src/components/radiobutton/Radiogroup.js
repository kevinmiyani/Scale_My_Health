import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import RadioButton from './RadioButton'

const Radiogroup = ({
    options,
    selected,
    onSelect = () => { },
    buttonStyle,
    fontStyle,
    containerStyle,
}) => {
    return (
        <View style={[styles.Container, containerStyle && containerStyle]}>
            {
                options.map((data, i) =>
                    <RadioButton
                        key={i}
                        isSelected={selected == data?.key}
                        data={data}
                        onPress={onSelect}
                        buttonStyle={buttonStyle}
                        fontStyle={fontStyle}
                    />
                )
            }
        </View>
    )
}

export default memo(Radiogroup)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})