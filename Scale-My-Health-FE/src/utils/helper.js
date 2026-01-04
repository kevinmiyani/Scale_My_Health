import { UserIcon, VideoIcon } from '../constants/Assets';
import { COLOR } from '../constants/Colors';

export const appointmentModes = [
    {
        id: 'in-person',
        title: 'In person',
        icon: UserIcon,
        background: COLOR.PRIMARYCOLOR,
        status: {
            upcoming: {
                text: 'Personal Consultation',
                background: COLOR.MOSSGREEN,
            },
            completed: {
                text: 'Consultation Completed',
                background: COLOR.MOSSGREEN_50,
            },
            missed: {
                text: 'Consultation Missed',
                background: COLOR.MOSSGREEN_50,
            },
            ongoing: {
                text: 'Ongoing Session',
                background: COLOR.MOSSGREEN_50,
            },
        },
    },
    {
        id: 'video',
        title: 'Video',
        icon: VideoIcon,
        background: COLOR.MOSSGREEN,
        status: {
            upcoming: {
                text: 'Start Video Consultation',
                background: COLOR.MOSSGREEN,
            },
            completed: {
                text: 'Consultation Completed',
                background: COLOR.MOSSGREEN_50,
            },
            missed: {
                text: 'Consultation Missed',
                background: COLOR.MOSSGREEN_50,
            },
            ongoing: {
                text: 'Ongoing Session',
                background: COLOR.MOSSGREEN_50,
            },
        },
    },
];

export const addMedicineList = {
    frequencyList: [
        { key: 'Once daily', value: 'Once daily' },
        { key: 'Twice daily', value: 'Twice daily' },
        { key: 'Daily', value: 'Daily' },
        { key: 'After every meal', value: 'After every meal' },
        { key: 'Before meals', value: 'Before meals' }
    ],
    durationList: [
        { key: 'For 15 Days', value: 'For 15 Days' },
        { key: 'For 10 Days', value: 'For 10 Days' },
        { key: 'For 30 Days', value: 'For 30 Days' },
        { key: 'For 1 Week', value: 'For 1 Week' },
        { key: 'For 6 Months', value: 'For 6 Months' },
        { key: 'Until symptoms improve', value: 'Until symptoms improve' }
    ],
    timeList: [
        { key: 'After Breakfast', value: 'After Breakfast' },
        { key: 'After Lunch and Dinner', value: 'After Lunch and Dinner' },
        { key: 'At Bedtime', value: 'At Bedtime' },
        { key: 'Before Breakfast', value: 'Before Breakfast' },
        { key: 'Before Dinner', value: 'Before Dinner' },
        { key: 'Midday', value: 'Midday' }
    ],
}

export const DefaultCountryForPhone = {
    callingCode: '+91',
    code: 'IN',
    country: 'India',
};

export const allContries = [
    'AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB',
    'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BV', 'BR', 'IO', 'VG', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM',
    'CA', 'CV', 'BQ', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ',
    'CD', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF',
    'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT',
    'HM', 'HN', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'CI', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE',
    'XK', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML',
    'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP',
    'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'KP', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE',
    'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'CG', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS',
    'SM', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'KR', 'SS', 'ES', 'LK', 'SD',
    'SR', 'SJ', 'SE', 'CH', 'SY', 'ST', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC',
    'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'VI', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN', 'WF', 'EH', 'YE', 'ZM', 'ZW',
    'KI', 'HK', 'AX'
];

export const includeContries = ['AU', 'CA', 'GB', 'IN', 'US'];