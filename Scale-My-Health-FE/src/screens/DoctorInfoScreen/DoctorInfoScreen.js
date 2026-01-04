import {
    View,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import React from 'react'
import useScreenHooks from './DoctorInfoScreen.Hooks';
import { styles } from './styles';
import OrangeButton from '../../components/button/OrangeButton';
import FastImage from 'react-native-fast-image';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import ProfileImage from '../../components/ProfileImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontFamily } from '../../constants/Fonts';
import Card from './components/Card';
import DescText from './components/DescText';
import TitleText from './components/TitleText';
import BulletText from './components/BulletText';
import ReviewCard from './components/ReviewCard';
import MenuStrip from './components/MenuStrip';

const DoctorInfoScreen = (props) => {

    const {
        _scrollViewRef,
        _introductionRef,
        _qualificationRef,
        _specialityRef,
        _reviewsRef,

        navigation,
        tabs,
        initialTabs,

        data,
        tab, setTab,

        onBookPress,
        onBackPress,
        onBookmarkPress,
        onTabPress,
        handleScroll,
    } = useScreenHooks(props);

    return (
        <>
            <View style={styles.HeaderContainer}>
                <View style={styles.HeaderButtonContainer}>
                    <TouchableOpacity onPress={onBackPress}>
                        <Ionicons
                            size={ResponsiveSizeWp(30)}
                            color={COLOR.WHITE}
                            name={'arrow-back'}
                        />
                    </TouchableOpacity>

                    <ProfileImage
                        img={data?.image}
                        initial={`${data?.firstName && data?.firstName[0]}${data?.lastName && data?.lastName[0]}`}
                        style={styles.ProfileImage}
                        initialSize={40}
                    />

                    <TouchableOpacity onPress={onBookmarkPress}>
                        <Ionicons
                            size={ResponsiveSizeWp(30)}
                            color={COLOR.WHITE}
                            name={'bookmark'}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.DoctorName}>
                    {`Dr ${data?.firstName} ${data?.lastName}`}
                </Text>
                <Text style={styles.DescText} numberOfLines={3}>
                    {data?.longDesignation}
                </Text>

                <View style={styles.FooterContainer}>
                    <Text style={styles.TitleText}>
                        {`Working Hours\n`}
                        <Text style={{ fontFamily: FontFamily.Bold }}>
                            {data?.timeLines?.map((time, i) => i == 0 ? `${time?.from} - ${time?.to}` : `\n${time?.from} - ${time?.to}`)}
                        </Text>
                    </Text>
                    <View>
                        <Text style={styles.TitleText}>Ratings</Text>
                        <View style={styles.RatingContainer}>
                            <FastImage
                                style={styles.IconStyle}
                                source={require('../../assets/icons/star.png')}
                                resizeMode='contain'
                            />
                            <Text style={[styles.TitleText, { fontFamily: FontFamily.Bold }]}>4.5</Text>
                        </View>
                    </View>
                </View>
            </View>

            <MenuStrip
                tabs={tabs}
                selected={tab}
                onTabPress={onTabPress}
            />

            <ScrollView
                ref={_scrollViewRef}
                onScroll={handleScroll}
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <View style={{ paddingHorizontal: ResponsiveSizeWp(15) }}>
                    {
                        tabs.some((tab) => tab == initialTabs[0]) &&
                        <Card
                            ref={_introductionRef}
                            title={'Introduction'}
                        >
                            <DescText>
                                {data?.intro}
                            </DescText>
                        </Card>
                    }

                    {
                        tabs.some((tab) => tab == initialTabs[1]) &&
                        <Card
                            ref={_qualificationRef}
                            title={'Professional Qualifications'}
                        >
                            {
                                data?.qualifications?.map((qualification, i) =>
                                    <View key={i}>
                                        <TitleText>
                                            {qualification?.type}
                                        </TitleText>
                                        {
                                            qualification?.details &&
                                            <DescText>
                                                {qualification?.details}
                                            </DescText>
                                        }
                                    </View>
                                )
                            }
                        </Card>
                    }

                    {
                        tabs.some((tab) => tab == initialTabs[2]) &&
                        <Card
                            ref={_specialityRef}
                            title={'Speciality'}
                        >
                            {
                                data?.specialities?.map((item, i) =>
                                    <View
                                        key={i}
                                        style={i != 0 && { marginTop: ResponsiveSizeWp(10) }}
                                    >
                                        <BulletText>
                                            {item?.type}
                                        </BulletText>
                                        <DescText>
                                            {item?.details}
                                        </DescText>
                                    </View>
                                )
                            }
                        </Card>
                    }

                    {
                        tabs.some((tab) => tab == initialTabs[3]) &&
                        <Card
                            ref={_reviewsRef}
                            title={'Reviews'}
                        >
                            {data?.reviews?.map((item, i) => <ReviewCard key={i} data={item} />)}
                        </Card>
                    }
                </View>
            </ScrollView>
            <OrangeButton
                onPress={onBookPress}
                text={'Book an Appointment'}
                icon={
                    <FastImage
                        source={require('../../assets/icons/calendar-days.png')}
                        style={{
                            width: ResponsiveSizeWp(30),
                            aspectRatio: 1 / 1,
                            resizeMode: 'contain',
                        }}
                    />
                }
            />
        </>
    )
}

export default DoctorInfoScreen