#biaoPopup使用文档

##上手
```html
<link rel="stylesheet" href="my-popup.css">
<link rel="stylesheet" href="btn.css">
<script src="../biaoPopup.js"></script>
<script >
    boot('#trigger', '#popup', custom = {//可选
        //position: 'centerX-top',//支持centerX,centerY,top,lef,right,bottom任一或多个组合
        // x_offset:10,
        // y_offset:20,
        // on:'dblclick',
        // keyCode:9,
    });
    let btn=document.getElementsByTagName('button');
    console.log( btn);
    for(let i=0;i<btn.length;i++){
        btn[i].classList.add('my-btn');
    }
</script>
```