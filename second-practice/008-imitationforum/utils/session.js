import store from './store';

function loggedIn() {
    return localStorage.getItem('sessionId');
}
function login(user) {
    let id = btoa(user.id);
    localStorage.setItem('sessionId', id);
    store.set('user', user);
    location.reload();
}
function logout() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    location.reload();
}
function getUser() {
    return store.get('user');
}
export default {
    login,
    logout,
    loggedIn,
    getUser
}