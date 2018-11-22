// let a=1; //window.a    undefined
// var a=1; //window.a    1

;(function(){
    'use strict';

    var a=1;//window.a    undefined
    window.price=10;//可以在b里拿到price
})();