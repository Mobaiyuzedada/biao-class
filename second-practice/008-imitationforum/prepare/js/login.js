import api from '../../api/user.api';



function boot() {
    let login = document.querySelector('.login');
    let loginform = document.querySelector('.form-table');
    let tbody = loginform.querySelector('tbody');
    tbody.addEventListener('click', e => {
        let errmsg = tbody.querySelector('.errmsg');
        errmsg && errmsg.remove();
    })
    login.addEventListener('click', e => {
        let params = {
            user_name: loginform.querySelector('[name=username]').value,
            password: loginform.querySelector('[name=password]').value
        }
        if (!params.user_name) {
            alert('用户名不能为空')
            return;
        }
        if (!params.password) {
            alert('密码不能为空')
            return;
        }
        logIn(params);
    })
    function logIn(user) {
        api.getUser(user).then(r => {
            console.log(r);
            if (r.status == 'ok') {
                alert('登陆成功')
                onLoginSuccess(r.user);
            } else if (r.status == 'error') {
                let tr = document.createElement('tr');
                tr.classList.add('errmsg');
                tr.innerHTML = `
                    <td></td>
                    <td style="color:#c10">用户名或密码错误</td>
                `
                tbody.insertBefore(tr, login.parentNode.parentNode)
            }
        }).catch(e => {
            console.log(e);
        })
    }
    function onLoginSuccess(user) {
        localStorage.setItem('session', btoa(user.id));
    }
}

export default {
    boot
}