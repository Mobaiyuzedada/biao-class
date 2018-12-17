window.vali = {
    isUsername,
    isEmail,
    isPhone,
    isPassword,
}


function isUsername(name) {
    if (!strBetw(name, 4, 25) ||
        name.includes('辣鸡') ||
        name.includes('%')
    )
        return false;
    return true;
}

function isEmail(mail) {
    if (!mail.includes('@'))
        return false;
    return true;
}

function isPhone(phone) {
    let pLen = phone.length != 11 && phone.length != 13 && phone.length != 14;//手机号不为11,13,14的判断
    let pStart = !phone.startsWith('1') && !phone.startsWith('+') && !phone.startsWith('8');//不为'1','+','8'开头的判断
    if (pLen || pStart)//长度和开头任一不满足都不满足
        return false;
    return true;
}

function isPassword(pwd) {
    if (!strBetw(pwd, 6, 24))
        return false;
    return true;
}

function numBetw(num, min, max) {
    return num >= min && num <= max;
}

function strBetw(str, min, max) {
    return numBetw(str.length, min, max);
}

