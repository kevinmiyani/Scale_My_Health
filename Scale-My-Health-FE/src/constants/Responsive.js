import DeviceInfo from 'react-native-device-info'; // https://www.npmjs.com/package/react-native-device-info
import { Dimensions, PixelRatio, Platform } from 'react-native';

// Retrieve initial screen's width
export const screenWidth = Dimensions.get('window').width;

// Retrieve initial screen's height
export const screenHeight = Dimensions.get('window').height + (Platform.OS == 'ios' ? 0 : 50);

export const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

export const ResponsiveSizeWp = (size) => {
  return DeviceInfo.isTablet() ? widthPercentageToDP(size * 0.17) : widthPercentageToDP(size * 0.25);
};

export const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

export const ResponsiveSizeHp = (size) => {
  return DeviceInfo.isTablet() ? heightPercentageToDP(size * 0.17) : heightPercentageToDP(size * 0.25);
};

export const BottomTabHeight = Platform.OS == 'ios' ? ResponsiveSizeWp(80) : ResponsiveSizeWp(75);
