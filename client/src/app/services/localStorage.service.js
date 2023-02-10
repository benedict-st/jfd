const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-refresh";
const EMAIL_KEY = "jwt-email";
const USERID_KEY = "user-local-id";
const MODAL_KEY = "modal-date-id";
const THEME_KEY = "theme-id";
export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600,
    email
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(USERID_KEY, userId);
}
export function setModalData(expiresIn = 3600) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(MODAL_KEY, expiresDate);
}

export function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}
export function getTheme() {
    return localStorage.getItem(THEME_KEY);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getEmailToken() {
    return localStorage.getItem(EMAIL_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function getModalDate() {
    return localStorage.getItem(MODAL_KEY);
}

export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(MODAL_KEY);
    localStorage.removeItem(THEME_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getEmailToken,
    getUserId,
    removeAuthData,
    getModalDate,
    setModalData,
    setTheme,
    getTheme
};

export default localStorageService;
