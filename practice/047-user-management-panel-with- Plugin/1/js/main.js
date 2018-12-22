; (function () {
    'use strict';

    /*
    测试biao-Form
    let a={
        username:'dry',
        email:'dry@gmail.com',
        balance:200,
        phone:'100000',
    }//测试数据
    let bf=biaoForm('#form-add-user');
    bf.setData(a);
    */
    /**
     * 测试biao-Table
     */


    let bt, bf;

    let userList = [];
    let struct = {
        username: '用户名',
        email: '邮箱',
        phone: '电话',
        balance: '余额',
    };
    let list = [{
        username: 'dry',
        email: 'dry@gmail.com',
        balance: 200,
        phone: '100000',
    }, {
        username: 'lsd',
        email: 'lsd@gmail.com',
        balance: 250,
        phone: '10086',
    }];
    let opts = {
        Update: {
            name: '更新',
            action: update,
            event: 'click',
        },
        Delete: {
            name: '删除',
            action: del,
            event: 'click',
        },

    }

    let form = document.querySelector('#form-add-user');
    let have = -1;
    boot();

    function boot() {
        bt = biaoTable('#user-table', struct, userList, opts);
        bf = biaoForm('#form-add-user', data => {

            if (have >= 0) {
                userList[have] = data;
                have = null;
            } else {
                userList.push(data);
            }
            bt.render();
            console.log(userList);
        });

    }



    function del(tr, i) {
        userList[i] = null;
        console.log(userList);
        tr.remove();
    }
    function update(tr, i) {
        bf.setData(userList[i]);
        have = i;
        console.log(have);
    }

})();