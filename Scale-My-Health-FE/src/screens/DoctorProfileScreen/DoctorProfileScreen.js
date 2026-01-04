import {
    Animated,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import useScreenHooks from './DoctorProfileScreen.Hooks';
import { styles } from './styles';
import ScreenHeader from '../../components/ScreenHeader';
import Tabs from './components/Tabs';
import DetailsScreen from './screens/DetailsScreen';
import QualificationsScreen from './screens/QualificationsScreen';
import SpecialitiesScreen from './screens/SpecialitiesScreen';
import TimeLinesScreen from './screens/TimeLinesScreen';
import HolidaysScreen from './screens/HolidaysScreen';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Feather from 'react-native-vector-icons/Feather';

const DoctorProfileScreen = (props) => {

    const {
        navigation,
        _scrollView,
        screenTitle,
        tabs,
        width,
        tabWidth,
        scrollX,
        editMode,

        onTabPress,
        onScrollEnd,
        onEditPress,
        onEditComplete,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Profile Screen'}
            subTitle={screenTitle}
            rightButton={!editMode && screenTitle == tabs[0].title.toString() &&
                <TouchableOpacity onPress={onEditPress} style={styles.EditButton}>
                    <Feather
                        name={'edit'}
                        color={COLOR.WHITE}
                        size={ResponsiveSizeWp(25)}
                    />
                </TouchableOpacity>
            }
        >
            <Tabs
                tabs={tabs}
                tabWidth={tabWidth}
                width={width}
                scrollX={scrollX}
                seletedTab={screenTitle}
                onTabPress={onTabPress}
            />

            <Animated.ScrollView
                ref={_scrollView}
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                nestedScrollEnabled
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true, }
                )}
                onMomentumScrollEnd={(layout) => { onScrollEnd(Math.round(layout.nativeEvent.contentOffset.x / width)) }}
            >
                <DetailsScreen width={width} title={tabs[0].title} editMode={editMode} onDismiss={onEditComplete} />
                <QualificationsScreen width={width} title={tabs[1].title} />
                <SpecialitiesScreen width={width} title={tabs[2].title} />
                <TimeLinesScreen width={width} title={tabs[3].title} />
                <HolidaysScreen width={width} title={tabs[4].title} />
            </Animated.ScrollView>
        </ScreenHeader>
    )
}

export default DoctorProfileScreen