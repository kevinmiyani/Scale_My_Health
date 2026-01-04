const getFileType = (extension) => {
    if (!extension) return 'unknown';

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'heic'];
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm'];
    const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'rtf'];

    if (imageExtensions.includes(extension?.toLowerCase())) {
        return 'image';
    } else if (videoExtensions.includes(extension?.toLowerCase())) {
        return 'video';
    } else if (documentExtensions.includes(extension?.toLowerCase())) {
        return 'document';
    } else {
        return 'other';
    }
};

export const fileSetup = (fileUrl = '', newName) => {
    const file = fileUrl?.split('/')?.pop()?.split('?')?.[0]?.replaceAll('%20', ' ')?.split('%2F')?.pop()?.split('.');
    const fileName = newName ? `${newName}.${file[1]}` : `${file[0]}.${file[1]}`;
    const type = getFileType(file?.pop());
    return { fileName, type };
}