import { useEffect, useRef, useState } from "react";
import { tabs } from "./helper";
import { Animated, Dimensions } from "react-native";

const width = Dimensions.get('screen').width;
const tabWidth = width / tabs.length;

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const _scrollView = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;

    // UseStates
    const [screenTitle, setScreenTitle] = useState(tabs[0].title.toString());
    const [editMode, setEditMode] = useState(false);

    // UseEffects


    // Methods
    const onTabPress = (index) => {
        setScreenTitle(tabs[index]?.title?.toString());
        _scrollView?.current?.scrollTo({ x: width * index, }, { animate: true });
    }

    const onScrollEnd = (index) => {
        setScreenTitle(tabs[index]?.title?.toString());
    }

    const onEditPress = () => setEditMode(true);

    const onEditComplete = () => setEditMode(false);

    return {
        navigation,
        screenTitle,
        _scrollView,
        tabs,
        width,
        tabWidth,
        scrollX,

        editMode,

        onTabPress,
        onScrollEnd,
        onEditPress,
        onEditComplete,
    };
}

export default useScreenHooks