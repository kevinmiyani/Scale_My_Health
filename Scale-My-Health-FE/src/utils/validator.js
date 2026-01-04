export const validEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

export const validPassword = (password) => {
    const regex = /^([A-Za-z0-9]).{6,}$/;
    return regex.test(password);
}

export const checkEmptyFields = (data) => Object.values(data).some(value => !value);