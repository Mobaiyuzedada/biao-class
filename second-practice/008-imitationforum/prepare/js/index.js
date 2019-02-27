import '../style/global.scss';
import '../style/form-table.scss';
import '../style/nav.scss';
import '../style/main.scss';
import '../style/auth.scss';
import '../style/setting.scss';
import signup from './signup';
import login from './login';
import session from './session';

let href = window.location.href;
let nowhref = 'file:///C:/Users/28933/Desktop/biao-class/second-practice/008-imitationforum/prepare'
if (href == nowhref + '/signup.html')
    signup.boot();
if (href == nowhref + '/login.html')
    login.boot();
session.boot();


