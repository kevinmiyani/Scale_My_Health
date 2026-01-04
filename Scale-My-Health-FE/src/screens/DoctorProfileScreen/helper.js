import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const iconSize = ResponsiveSizeWp(24);

export const tabs = [
    {
        title: 'Details',
        icon: <FontAwesome5 name={'user-md'} size={iconSize} color={COLOR.WHITE} />
    },
    {
        title: 'Qualifications',
        icon: <FontAwesome5 name={'graduation-cap'} size={iconSize} color={COLOR.WHITE} />,
    },
    {
        title: 'Specialities',
        icon: <FontAwesome5 name={'heartbeat'} size={iconSize} color={COLOR.WHITE} />,
    },
    {
        title: 'Time Lines',
        icon: <MaterialIcons name={'schedule'} size={iconSize * 1.1} color={COLOR.WHITE} />,
    },
    {
        title: 'Upcoming Holidays',
        icon: <MaterialCommunityIcons name={'calendar-check'} size={iconSize * 1.1} color={COLOR.WHITE} />,
    },
]
