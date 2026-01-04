import { useEffect, useRef, useState } from "react";
import { NavigationScreens, navigationToNavigate } from "../../navigation/helper";
import { ResponsiveSizeWp } from "../../constants/Responsive";

const initialTabs = ['About Me', 'Qualifications', 'Speciality', 'Reviews'];

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { data } = props?.route?.params;
    const _scrollViewRef = useRef(null);
    const _introductionRef = useRef(null);
    const _qualificationRef = useRef(null);
    const _specialityRef = useRef(null);
    const _reviewsRef = useRef(null);

    // UseStates
    const [tabs, setTabs] = useState([]);
    const [tab, setTab] = useState();

    // UseEffects
    useEffect(() => {
        processTabs();
    }, [])

    // Methods
    const processTabs = () => {
        const tempTabs = [];
        if (data?.intro) tempTabs.push(initialTabs[0]);
        if (data?.qualifications?.length > 0) tempTabs.push(initialTabs[1]);
        if (data?.specialities?.length > 0) tempTabs.push(initialTabs[2]);
        if (data?.reviews?.length > 0) tempTabs.push(initialTabs[3]);
        setTab(tempTabs[0]);
        setTabs(tempTabs);
    }

    const onBookPress = () => { navigationToNavigate(navigation, NavigationScreens.AppointmentBookingScreen, data) }

    const onBackPress = () => navigation.pop(1);

    const onBookmarkPress = () => { }

    const onTabPress = (tab) => {
        let viewRef = null;
        switch (tab) {
            case initialTabs[0]:
                viewRef = _introductionRef;
                break;
            case initialTabs[1]:
                viewRef = _qualificationRef;
                break;
            case initialTabs[2]:
                viewRef = _specialityRef;
                break;
            case initialTabs[3]:
                viewRef = _reviewsRef;
                break;
            default:
                break;
        }
        viewRef?.current?.measureLayout(
            _scrollViewRef.current,
            (x, y) => {
                _scrollViewRef.current.scrollTo({ x: 0, y: (y - ResponsiveSizeWp(10)), animated: true });
            },
            (error) => console.log(error)
        );
        setTab(tab);
    }

    const handleScroll = (event) => {
        // const scrollY = event.nativeEvent.contentOffset.y;
        // const refs = [
        //     { tab: tabs[0], ref: _introductionRef },
        //     { tab: tabs[1], ref: _qualificationRef },
        //     { tab: tabs[2], ref: _specialityRef },
        //     { tab: tabs[3], ref: _reviewsRef },
        // ];
        // refs.forEach(({ tab, ref }) => {
        //     ref?.current?.measureLayout(
        //         _scrollViewRef.current,
        //         (x, y, width, height) => {
        //             if (scrollY >= y - ResponsiveSizeWp(10) && scrollY < y + height - ResponsiveSizeWp(10)) {
        //                 setTab(tab);
        //             }
        //         },
        //         (error) => console.log(error)
        //     );
        // });
    };

    return {
        _scrollViewRef,
        _introductionRef,
        _qualificationRef,
        _specialityRef,
        _reviewsRef,

        initialTabs,
        navigation,
        tabs,

        data,
        tab, setTab,

        onBookPress,
        onBackPress,
        onBookmarkPress,
        onTabPress,
        handleScroll
    };
}

export default useScreenHooks