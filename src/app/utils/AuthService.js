function getJwtToken() {
    return sessionStorage['ayna-jwt'];
}

export function isLoggedIn() {
    if(!sessionStorage['ayna-jwt']) {
        return false;
    } else {
        return true;
    }
}

export function loggedOut() {
    sessionStorage.clear();
}

export function requireAuth(nextState, replace) {
    if(!isLoggedIn()) {
        replace({pathname: '/login'})
    }
}