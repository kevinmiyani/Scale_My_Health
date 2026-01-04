import RNFS from 'react-native-fs';
import { NativeModules, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import { SuccessToast } from '../../constants/ToastMessage';

const refreshStorage = async ({ toFile, fileType }) => {
    if (Platform.OS === 'android') {
        const { RNMediaScanner } = NativeModules;
        RNMediaScanner && RNMediaScanner.scanFile(toFile);
    }
    if (Platform.OS === 'ios') {
        if (fileType === 'image' || fileType === 'video') {
            await CameraRoll.save(toFile, { type: fileType });
        } else {
            RNFetchBlob.ios.previewDocument(toFile);
        }
    }
}

// From Url / Server to Device
export const downloadAndSaveFileInDevice = async ({ fromUrl, toFile, fileType, progress = () => { }, message }) => {
    try {

        if (!fromUrl) {
            console.log('Missing : fromUrl required.');
            return;
        } else if (!toFile) {
            console.log('Missing : toFile required.');
            return;
        } else if (!fileType) {
            console.log('Missing : fileType required.');
            return;
        }

        const downloadResult = await RNFS.downloadFile({
            fromUrl: fromUrl,
            toFile: toFile,
            background: true,
            progress: (res) => { progress(((res.bytesWritten / res.contentLength) * 100).toFixed(2)); },
        }).promise;

        if (downloadResult.statusCode === 200) {
            await refreshStorage({ fileType, toFile });
            SuccessToast('', `${message} saved successfully.`);
        } else {
            ErrorToast('Failed', 'Download failed with status ' + downloadResult.statusCode);
        }

    } catch (error) {
        console.log('Error saving file:', error);
        ErrorToast('Error', `Failed to save ${message}.`);
    }
};

// Copy and Move the file in device
export const manageFileInDevice = async ({ fromUrl, toFile, fileType, copy = false, message }) => {
    try {

        if (!fromUrl) {
            console.log('Missing : fromUrl required.');
            return;
        } else if (!toFile) {
            console.log('Missing : toFile required.');
            return;
        } else if (!fileType) {
            console.log('Missing : fileType required.');
            return;
        }

        const fileExists = await RNFS.exists(toFile);
        if (fileExists) await RNFS.unlink(toFile);

        if (copy == true) await RNFS.copyFile(fromUrl, toFile).promise;
        else await RNFS.moveFile(fromUrl, toFile).promise;

        await refreshStorage({ fileType, toFile });

        SuccessToast('', `${message} saved successfully.`);
    } catch (error) {
        console.log('Error saving file:', error);
        ErrorToast('Error', `Failed to save ${message}.`);
    }
};