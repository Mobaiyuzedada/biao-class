/**
 * 定义函数，然后写到对象里，调用不用this.直接写到对象里调用要用this，此时this=is本身
 */

; (function () {
    'use strict';
    let a = 3;
    let is = {
        numeric,
        min,
        max,
        betw,
        positive,
        negative,
        minLength,
        maxLength,
        lenBetw,
        startsWith,
        endsWith,
        includes,
        inArr,

        //正则部分
        regex,
        email,

    }

    function parseRule(str){
        return {
            
        }
    }


    /*
    |-------------------------------------------------------
    | 基础部分
    |-------------------------------------------------------
    | description:
    | 简单的判断函数
    */
    //是否为数字
    function numeric(value) {
        return !isNaN(parseFloat(value));
    }
    //是否为最小值
    function min(value, min) {
        if (!numeric(value))
            return false;
        return value >= min;
    }
    //是否为最大值
    function max(value, max) {
        if (!numeric(value))
            return false;
        return value <= max;
    }
    //是否在[a,b]之间
    function betw(value, a, b) {
        if (a < b) {
            return min(value, a) && max(value, b);
        } else {
            return min(value, b) && max(value, a);
        }
    }
    //字符串的长度是否为小值
    function minLength(value, minLen) {
        return min(value.length, minLen);
    }
    //字符串的长度是否为大值
    function maxLength(value, maxLen) {
        return max(value.length, maxLen);
    }
    //字符串长度是否在[a,b]之间
    function lenBetw(value, a, b) {
        return betw(value.length, a, b);
    }
    //是否为正数
    function positive(value) {
        if (!numeric(value))
            return false;
        return value > 0;
    }
    //是否为负数
    function negative(value) {
        if (!numeric(value))
            return false;
        return value < 0;
    }

    //字符串是否以target开头
    function startsWith(value, target) {
        return value.startsWith(target);
    }
    //字符串是否以target结尾
    function endsWith(value, target) {
        return value.endsWith(target);
    }
    //字符串是否包含target
    function includes(value, target) {
        return value.includes(target);
    }
    /**
     * value是否在某数组中
     * @param {mix} value : 任意值
     * @param {Array} arr : 数组
     */
    function inArr(value, arr) {
        return arr.indexOf(value) !== -1;
    }
    // console.log(is.inArr("a", ["a", 2, 4, "wadaw"]));//true
    // console.log(is.includes('asssd', 'sssd'));//true
    // console.log(is.endsWith('asssd', 'd'));//true
    // console.log(is.startsWith('asssd', 'a'));//true
    // console.log(is.lenBetw('asdsadsaad', 29, 5));//true
    // console.log(is.minLength('sadasd', 6));//true
    // console.log(is.betw(-3, -2, -4));//true
    // console.log(is.positive(0.2));//true
    // console.log(is.max(3, 3));//true
    // console.log(is.min(2, 3));//false
    // console.log(is.numeric(3));//true

    /*
    |-------------------------------------------------------
    | 正则部分
    |-------------------------------------------------------
    | description
    */
    function regex(value, reg) {
        if (typeof reg == 'string') {
            reg = new RegExp(reg);
        }
        return reg.test(value);

    }
    function email(value) {
        let re = /^\w+@\w+\.\w+$/;
        return re.test(value);
    }
    function username(value) {
        let re = /^[a-zA-Z0-9]\w+$/;
        return re.test(value);
    }
    function phone(value,country='zh'){
        let re=/^(?:\+?(?:86))?(\s|-)?1[34578]\d{9}/;
        return re.test(value);
    }

    // console.log(phone('18899999999') );
    // console.log(is.email('wh@s.hqqc_asdasdom'));
    // // console.log(regex('6wssaasdss_66', ''));
    // console.log(regex('_assa', /^[^\d]?[a-zA-Z0-9]{4,6}_?\w?$/));
    /*
    |-------------------------------------------------------
    | ^[^\d]?[a-zA-Z0-9]{4,6}_?\w?$
    |-------------------------------------------------------
    | 解读：
    | ^ [^\d]? [a-zA-Z0-9]{4,6 } _? \w?$
    | 1.\d匹配数字，^\d匹配数字开头，[^\d]匹配所有非数字内容
    | 2.^[^\d]匹配所有的非数字内容开头，即以非数字开头，不能以数字开头
    | 3.[a-zA-Z0-9]{4,6}匹配a-z,A-Z,0-9的内容，可以出现4-6位之间
    | 4._? 匹配下划线，出现0-1次
    | 5.\w?$ 以\w结尾，且结尾只能出现一次\w
    | 6. 总位数：\w:0-1 [a-zA-Z0-9]:4-6 _:0-1 总:4-8
    */

})();















/* 直接在对象里写函数的形式。调用函数必须用this

//是否为数字
function numeric(value) {
    return !isNaN(parseFloat(value));
}
//是否为最小值
function min(value, min) {
    if (!this.numeric(value))
        return false;
    return value >= min;
}
//是否为最大值
function max(value, max) {
    if (!this.numeric(value))
        return false;
    return value <= max;
}
//是否在[a,b]之间
function betw(value, a, b) {
    if (a < b) {
        return this.min(value, a) && this.max(value, b);
    } else {
        return this.min(value, b) && this.max(value, a);
    }
}
//字符串的长度是否为小值
function minLength(value, min) {
    return this.min(value.length, min);
}
//字符串的长度是否为大值
function maxLength(value, max) {
    return this.max(value.length, max);
}
//字符串长度是否在[a,b]之间
function lenBetw(value, a, b) {
    if (a < b) {
        return this.minLength(value, a) && this.maxLength(value, b);
    } else {
        return this.minLength(value, b) && this.maxLength(value, a);
    }
}
//是否为正数
function positive(value) {
    if (!this.numeric(value))
        return false;
    return value > 0;
}
//是否为负数
function negative(value) {
    if (!this.numeric(value))
        return false;
    return value < 0;
}




let is = {
    numeric(value) {
        return !isNaN(parseFloat(value));
    },
    //是否为最小值
   min(value, min) {
        if (!this.numeric(value))
            return false;
        return value >= min;
    },
    //是否为最大值
   max(value, max) {
        if (!this.numeric(value))
            return false;
        return value <= max;
    },
    //是否在[a,b]之间
   betw(value, a, b) {
        if (a < b) {
            return this.min(value, a) && this.max(value, b);
        } else {
            return this.min(value, b) && this.max(value, a);
        }
    },
}

*/