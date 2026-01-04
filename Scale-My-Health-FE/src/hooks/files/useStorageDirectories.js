import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { fileSetup } from './fileUtils';

const appName = 'Scale My Health'; // Your Application Name
const appPackage = 'com.scalemyhealth'; // Your Application Package 

/**
 * Get data from the specified main directory.
 * 
 * @param {Object} options - Options object.
 * @param {'/Android/media/appPackage/appName/' | '/Android/data/appPackage/appName/' | '/DCIM/appName/' | 
* '/Documents/appName/' | '/Download/appName/' | '/Movies/appName/' | 
* '/Music/appName/' | '/Notifications/appName/' | '/Pictures/appName/' | 
* '/Podcasts/appName/' | '/Recordings/appName/' | '/Ringtones/appName/' } options.mainDir - The main directory path.
*/

export const getStorageBasePath = ({
    mainDir = '/Android/media/appPackage/appName/'
}) => {
    const mainDirectory = mainDir.replaceAll('appName', appName).replaceAll('appPackage', appPackage)

    const storagePath = Platform.OS == 'android' ? `${RNFS.ExternalStorageDirectoryPath}${mainDirectory}` : `${RNFS.DocumentDirectoryPath}/`;

    return storagePath;
}

export const getFileStorePath = async ({ basePath, file, fileType, subDir }) => {
    let folderPath = basePath;

    if (Platform.OS == 'android') {
        if (basePath?.includes('/Android/media/') || basePath?.includes('/Android/data/')) {
            if (fileType === 'image') {
                folderPath += `${appName} Images/`;
            } else if (fileType === 'video') {
                folderPath += `${appName} Video/`;
            } else if (fileType === 'document') {
                folderPath += `${appName} Documents/`;
            } else {
                folderPath += `Other/`;
            }
        }
    }

    if (subDir && subDir?.trim()) folderPath += `${subDir}/`;

    await RNFS.mkdir(folderPath);

    return `${folderPath}${file}`;
}

const fileStorage = async ({ url, subDir, newName, storagePath }) => {
    const { fileName, type } = fileSetup(url, newName);

    const toFilePath = await getFileStorePath({ basePath: storagePath, file: fileName, fileType: type, subDir: subDir })

    return {
        toFilePath: toFilePath,
        fileType: type,
    }
}

/**
 * Get data from the specified main directory.
 * 
 * @param {Object} options - Options object.
 * @param {'/Android/media/appPackage/appName/' | '/Android/data/appPackage/appName/' | '/DCIM/appName/' | 
* '/Documents/appName/' | '/Download/appName/' | '/Movies/appName/' | 
* '/Music/appName/' | '/Notifications/appName/' | '/Pictures/appName/' | 
* '/Podcasts/appName/' | '/Recordings/appName/' | '/Ringtones/appName/' } options.mainDir - The main directory path.
*/

export const useStorageDirectories = ({
    mainDir = '/Android/media/appPackage/appName/'
}) => {
    const storagePath = getStorageBasePath({ mainDir });

    const fileStorageInfo = async ({ url, subDir, newName }) => await fileStorage({ url, subDir, newName, storagePath });

    return { storagePath, getFileStorePath, getStorageBasePath, fileStorageInfo }
}

export const useAndroidMediaDirectory = () => useStorageDirectories({ mainDir: '/Android/media/appPackage/appName/' }); // Store files like Whatsapp
export const useAndroidDataDirectory = () => useStorageDirectories({ mainDir: '/Android/data/appPackage/appName/' });
export const useDCIMDirectory = () => useStorageDirectories({ mainDir: '/DCIM/appName/' });
export const useDocumentsDirectory = () => useStorageDirectories({ mainDir: '/Documents/appName/' });
export const useDownloadDirectory = () => useStorageDirectories({ mainDir: '/Download/appName/' });
export const useMoviesDirectory = () => useStorageDirectories({ mainDir: '/Movies/appName/' });
export const useMusicDirectory = () => useStorageDirectories({ mainDir: '/Music/appName/' });
export const useNotificationsDirectory = () => useStorageDirectories({ mainDir: '/Notifications/appName/' });
export const usePicturesDirectory = () => useStorageDirectories({ mainDir: '/Pictures/appName/' });
export const usePodcastsDirectory = () => useStorageDirectories({ mainDir: '/Podcasts/appName/' });
export const useRecordingsDirectory = () => useStorageDirectories({ mainDir: '/Recordings/appName/' });
export const useRingtonesDirectory = () => useStorageDirectories({ mainDir: '/Ringtones/appName/' });