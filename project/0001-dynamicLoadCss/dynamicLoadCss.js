


function dynamicLoadCss(url){
    var head=document.getElementsByTagName('head')[0];
    let link=document.createElement('link');

    link.type='text/css';
    link.rel='stylesheet';
    link.href=url;
    head.appendChild(link);
}

// function dynamicLoadCss(url){
//     var head=document.getElementsByTagName('head')[0];
//     let link=document.createElement('link');

//     link.type='text/css';
//     link.rel='stylesheet';
//     link.href=url;
//     head.appendChild(link);
// }