import api from '../../api/user.api';
let $user;
window.logout = logout;
function boot() {
    let id = isLoggedIn();
    id ? load(id) : render();

}
function isLoggedIn() {
    return atob(localStorage.getItem('session'))
}
function load(id) {
    api.getUserById(id).then(res => {
        if (res.status == "ok") {
            $user = res.user;
            render();
        }
    })
}
function render() {
    let loggedin = document.querySelector('.loggedIn');
    let tourist = document.querySelector('.tourist');
    console.log(loggedin);
    console.log(tourist);
    if ($user) {
        loggedin.innerHTML = `<a href="#" class="nav-item">${$user.username}</a>
        <a onclick="logout()" class="nav-item">登出</a>
        `;
        tourist.hidden = !(loggedin.hidden = false);
    } else {
        tourist.hidden = !(loggedin.hidden = true);
    }
}
function logout() {
    localStorage.removeItem('session');
    location.reload();
}
export default {
    boot
}
