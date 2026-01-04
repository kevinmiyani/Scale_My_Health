import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkp37uzuc/image/upload'; // glutton2k23@gmail.com

const UPLOAD_PRESET = 'Scale_My_Health'; // Set in Cloudinary settings

export const useCloudinaryUpload = () => {

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', {
            uri: image?.path,
            type: image?.mime,
            name: `upload_${new Date().toString()}.jpg`,
        });
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await axios.post(CLOUDINARY_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res?.data?.secure_url;
        } catch (err) {
            console.log(err);
            return '';
        }
    };

    return { uploadImage, };
};