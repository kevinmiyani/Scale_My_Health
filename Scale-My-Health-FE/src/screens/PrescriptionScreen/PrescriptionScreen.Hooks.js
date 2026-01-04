import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { useFilePermissions } from "../../hooks/files/useFilePermissions";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { prescriptionToHtml } from "../../hooks/files/prescriptionHtmlGenerator";
import { useDocumentsDirectory } from "../../hooks/files/useStorageDirectories";
import { manageFileInDevice } from "../../hooks/files/fileManager";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { data } = props?.route?.params;
    const userRole = useSelector(state => state[reducers.UserDataReducer])?.role;
    const { requestFilePermission } = useFilePermissions();
    const { fileStorageInfo } = useDocumentsDirectory();

    const onSavePress = async () => {
        try {
            const html = prescriptionToHtml(data);
            const file = await RNHTMLtoPDF.convert({
                html: html,
                padding: 0,
                bgColor: '#FFFFFF',
                width: 595,
                height: 842,
            });

            const hasPermission = await requestFilePermission();

            if (!hasPermission) {
                console.log('Permission Denied', 'Enable storage access to save files.');
                return;
            }

            const { fileType, toFilePath } = await fileStorageInfo({ url: file.filePath, newName: data?._id, subDir: 'Prescriptions' }); // Required for storing a file

            await manageFileInDevice({
                fromUrl: file.filePath,
                message: 'Prescription',
                fileType: fileType,
                toFile: toFilePath,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return {
        navigation,
        data,
        userRole,

        onSavePress,
    };
}

export default useScreenHooks