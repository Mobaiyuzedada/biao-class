<h2 style="color:blue">parseInt(string,radix) </h2>
<div class="content">
    <p>当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。 </p>
    <p>举例，如果 string 以 "0x" 开头，parseInt() 会把string 的其余部分解析为十六进制的整数。如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt()
        的一个实现把其后的字符解析为八进制或十六进制的数字。如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。只有字符串中的第一个数字会被返回，开头和结尾的空格是允许的</p>
</div>
<strong>示例：</strong>
   
```js
parseInt("10");			//返回 10
parseInt("19",10);		//返回 19 (10+9)
parseInt("11",2);		//返回 3 (2+1)
parseInt("17",8);		//返回 15 (8+7)
parseInt("1f",16);		//返回 31 (16+15)
parseInt("010");		//未定：返回 10 或 8
```
<h2 style="color:blue">Number()</h2>
<div class="content">
    <p>把Object的值转换为数字 </p>
    <p>如果参数是 Date 对象，Number() 返回从 1970 年 1 月 1 日至今的毫秒数。</p>
    <p>如果对象的值无法转换为数字，那么 Number() 函数返回 NaN。</p>
</div>
<strong>示例：</strong>

```js
Number( new Boolean(true/false) )           // 1 or 0
Number( new Date() )                        // 1548318874276
Number( new String("999") )                 // 999
Number( new String("999 888") )             //NaN
```

<h2 style="color:blue">Math相关的函数</h2>

- ```Math.floor()```向下取整、地板、舍位     
<strong>示例：</strong>
```js
Math.floor(1.6);                     // 1
Math.floor(0.6);                     // 0
Math.floor(5);                       // 5
Math.floor(-5.1);                    // -6
Math.floor(-5.9);                    // -6
```
- ```Math.ceil()```向上取整、天花板、进位

- ```Math.round()```最近整数、周围、四舍五入

<h2 style="color:blue">Javascript Array对象</h2>
<p><strong>说明：</strong>用于在单个的变量中存储多个值。</p>
<strong>语法：</strong>

```js
new Array();
new Array(length);
new Array(elem0,elem1,elem2,...,elemN);
```
<h2>Array对象方法(部分)</h2>

```fill()```  

<strong>释意：</strong>
fill()方法用于将一个固定值替换数组里选定的元素。  
<strong>语法：</strong>
```array.fill(value,start,end)```。start为开始位置，end为结束位置。后两项为可选项。   
<strong>示例:</strong>
```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill(0);//fruits:[0,0,0,0]
fruits.fill(2,2,6)//fruits:[0,0,2,2]
```
<strong>注意：</strong>IE 11 及更早版本不支持 fill() 方法。

```map()```  
    
<p style="margin-bottom:-15px"><strong>释意：</strong></p>
<p>
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。<br>     
map() 方法按照原始数组元素顺序依次处理元素。<br>        
map() 不会对空数组进行检测。也不会改变原始数组。 
</p>   
<p style="margin-bottom:-8px"><strong>语法：</strong></p>
<p> 

```array.map(function(item,index,arr))```。<span style="color:red">item为当前数组每一项的值，不可省。</span>index为当前数组的索引，arr为当前数组。均可省略。<br>
<strong>示例:</strong>
```js
let i = 11;
let numbers = [3, 10, 12, 33];
function multiplyArrayElement(item) {
    return item * i;
}
//newArr=numbers.map(multiplyArrayElement(item))
var newArr = numbers.map(multiplyArrayElement);
console.log('newArr:' + JSON.stringify(newArr));//newArr:[33,110,132,363]
```
```js
let newArr = [];
let res = [{ name: 'dry', age: '11', sex: 'male' }];
newArr = res.map(item => {
    return {
        title: item.name,
        age: item.age,
        gender: item.sex
    }
});
console.log('newArr:' + JSON.stringify(newArr));//newArr:[{"title":"dry","age":"11","gender":"male"}]
```
```js
let newArr = [];
let res2 = [{ name: 'dry' }, { age: '11' }, { sex: 'male' }];
newArr = res2.map((item, index, arr) => {
    var jsonData = item;
    var data = JSON.stringify(jsonData);
    console.log(`元素${index}：${data}`);
//元素0：{"name":"dry"} 
//元素1：{"age":"11"}
//元素2：{"sex":"male"}
    return item;
})
newArr = JSON.stringify(newArr);
console.log(`newArr：${newArr}`);//newArr：[{"name":"dry"},{"age":"11"},{"sex":"male"}]
```