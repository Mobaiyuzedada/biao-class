import api from '../../api/user.api';

function boot() {
    let sign_up = document.querySelector('#signup');
    let signform = document.querySelector('.form-table');
    sign_up.addEventListener('click', e => {
        let params = {
            user_name: signform.querySelector('[name=username]').value,
            password: signform.querySelector('[name=password]').value
        }
        if (!params.user_name) {
            alert('用户名不能为空')
            return;
        }
        if (!params.password) {
            alert('密码不能为空')
            return;
        }
        signup(params);
    })
    function signup(user) {
        api.createUser(user).then(r => {
            if (r.status == "ok")
                alert('注册成功');
                location.href="./login.html"
        }).catch(e => {
            if (e.error == "duplicate")
                alert('用户名已存在')
        })
    }
}

export default {
    boot
}