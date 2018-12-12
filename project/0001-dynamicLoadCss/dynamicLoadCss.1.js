


function dynamicLoadCss(url){
    var head=document.getElementsByName('head')[0];
    let link=document.createElement('link');

    link.type='text/css';
    link.rel='stylesheet';
    link.href=url;
    head.appendChild(link);
}