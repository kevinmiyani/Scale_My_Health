import { StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { COLOR } from '../../../constants/Colors';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { FontFamily } from '../../../constants/Fonts';
import { elevation_5 } from '../../../constants/styles';

const AdharInput = ({
    value,
    onChangeText = () => { },
}) => {
    const [part1, setPart1] = useState(value?.slice(0, 4) ?? '');
    const [part2, setPart2] = useState(value?.slice(4, 8) ?? '');
    const [part3, setPart3] = useState(value?.slice(8, 12) ?? '');

    const refPart1 = useRef(null);
    const refPart2 = useRef(null);
    const refPart3 = useRef(null);

    useEffect(() => {
        onChangeText(`${part1}${part2}${part3}`);
    }, [part1, part2, part3])

    useEffect(() => {
        if (!value) {
            setPart1('');
            setPart2('');
            setPart3('');
        }
    }, [value])

    const handleInputChange = (value, setter, maxLength, nextInputRef) => {
        if (/^[0-9]*$/.test(value)) {
            if (value.length <= maxLength) {
                setter(value);
                if (value.length === maxLength) {
                    if (nextInputRef) {
                        nextInputRef.current.focus();
                    } else {
                        if (part1.length === 4 && part2.length === 4 && value.length === 4) {
                            Keyboard.dismiss();
                        }
                    }
                }
            }
        }
    };

    const handleKeyPress = (key, currentValue, setter, prevInputRef) => {
        if (key === 'Backspace') {
            if (currentValue.length === 0 && prevInputRef) {
                prevInputRef.current.focus();
            } else {
                setter(currentValue.slice(0, -1));
            }
        }
    };

    const handleFocus = (currentRef) => {
        switch (currentRef) {
            case refPart1:
                setPart2('');
                setPart3('');
                break;
            case refPart2:
                setPart3('');
                part1.length != 4 && refPart1.current.focus();
                break;
            case refPart3:
                part2.length != 4 && refPart2.current.focus();
                break;
            default:
                break;
        }
    };

    return (
        <View style={[styles.Container, elevation_5]}>
            <Text style={styles.AdharTextStyle}>Aadhar Card No.</Text>
            <View style={styles.InputContainer}>
                <TextInput
                    style={styles.Input}
                    value={part1}
                    onChangeText={(value) => handleInputChange(value, setPart1, 4, refPart2)}
                    onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(nativeEvent.key, part1, setPart1, null)
                    }
                    keyboardType="numeric"
                    maxLength={4}
                    placeholder='XXXX'
                    onFocus={() => handleFocus(refPart1)}
                    ref={refPart1}
                />
                <TextInput
                    style={styles.Input}
                    value={part2}
                    onChangeText={(value) => handleInputChange(value, setPart2, 4, refPart3)}
                    onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(nativeEvent.key, part2, setPart2, refPart1)
                    }
                    keyboardType="numeric"
                    maxLength={4}
                    placeholder='XXXX'
                    onFocus={() => handleFocus(refPart2)}
                    ref={refPart2}
                />
                <TextInput
                    style={styles.Input}
                    value={part3}
                    onChangeText={(value) => handleInputChange(value, setPart3, 4, null)}
                    onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(nativeEvent.key, part3, setPart3, refPart2)
                    }
                    keyboardType="numeric"
                    maxLength={4}
                    placeholder='XXXX'
                    onFocus={() => handleFocus(refPart3)}
                    ref={refPart3}
                />
            </View>
        </View>
    );
};

export default memo(AdharInput);

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        backgroundColor: COLOR.WHITE,
        marginTop: ResponsiveSizeWp(20),
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    AdharTextStyle: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(18),
    },
    InputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: ResponsiveSizeWp(20),
        gap: ResponsiveSizeWp(15),
    },
    Input: {
        flex: 1,
        height: ResponsiveSizeWp(40),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
        borderRadius: ResponsiveSizeWp(40),
        padding: ResponsiveSizeWp(5),
        textAlign: 'center',
        fontSize: ResponsiveSizeWp(16),
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        letterSpacing: 2,
    },
});

