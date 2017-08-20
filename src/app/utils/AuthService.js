export function login() {
       
}

export function loggedOut() {
    sessionStorage.clear();
}

export function isLoggedIn() {
    if(!sessionStorage['ayna-jwt']) {
        return false;
    } else {
        return true;
    }
}

export function requireAuth(nextState, replace) {
    if(!isLoggedIn()) {
        replace({pathname: '/login'})
    }
}