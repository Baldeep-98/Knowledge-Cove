import {jwtDecode} from 'jwt-decode';

const checkTokenValidity = (webToken) => {
    try {
        const decodedWT = jwtDecode(webToken);
        const currentTime = Date.now() / 1000;
        return decodedWT.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export const isWebTokenValid = () => {
    const token = JSON.parse(localStorage.getItem('webToken'));
    return checkTokenValidity(token)
}