


let default_config = {

}
/*
|-------------------------------------------------------
| 备注1：parseInt(string,radix)
|-------------------------------------------------------
| description
|      当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。      
|      举例，如果 string 以 "0x" 开头，parseInt() 会把string 的其余部分解析为十六进制的整数。
|      如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。
|      如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。
|      只有字符串中的第一个数字会被返回，开头和结尾的空格是允许的
|      parseInt("10");			//返回 10
|      parseInt("19",10);		//返回 19 (10+9)
|      parseInt("11",2);		//返回 3 (2+1)
|      parseInt("17",8);		//返回 15 (8+7)
|      parseInt("1f",16);		//返回 31 (16+15)
|      parseInt("010");		//未定：返回 10 或 8
*/
/*
|-------------------------------------------------------
| 备注2：Number()
|-------------------------------------------------------
| description
|       把Object的值转换为数字
|       如果参数是 Date 对象，Number() 返回从 1970 年 1 月 1 日至今的毫秒数。
|       如果对象的值无法转换为数字，那么 Number() 函数返回 NaN。
|       Number( new Boolean(true/false) )           // 1 or 0
|       Number( new Date() )                        // 1548318874276
|       Number( new String("999") )                 // 999
|       Number( new String("999 888") )             //NaN
*/
/*
|-------------------------------------------------------
| 备注3：Math.floor()向下取整、地板、舍位
|-------------------------------------------------------
| description
|       返回小于X的最大整数
|          Math.floor(1.6);                     // 1
|          Math.floor(0.6);                     // 0
|          Math.floor(5);                       // 5
|          Math.floor(-5.1);                    // -6
|          Math.floor(-5.9);                    // -6
*/
//Math.ceil()向上取整、天花板、进位
//Math.round()最近整数、周围、四舍五入
/**
 * 
 * @param Object settings:配置
 * @param config.max:最大页数
 * @param config.length:显示多少页
 * @param config.current:当前页 
 */


/*
|-------------------------------------------------------
| 假定页数长度为5页。总页数为max
| 分析：页面显示共三种:
|              1.开始部分： 当current<=Math.floor(5/2)+1,开始页为1
|                          1,2,3,4,5,...max
|              2.中间部分： 当current>Math.floor(5/2)+1时，即current>4时,开始页为current-2
|                          1,...,current-2,current-1,current,current+1,current,...max
|              3.结尾部分： 当current>=max-2时，
|                          1,...,max-4,max-3,max-2,max-1,max
|-------------------------------------------------------

*/

function init(settings) {

    let config = Object.assign({}, settings, default_config);
    //当前页
    let current = parseInt(config.current); //parseInt(string,radix)参加备注1
    let length = config.length; //显示的页数
    //求出左端点=当前页-长度/2
    let left = Math.max(1, current - Math.floor(Number(length) / 2))    //Number()参见备注2，Math.xxx()参见备注3
    //生成页数数组
    let pages = new Array(parseInt(length)) //声明一个长度为length的数组
        .fill(0) //值全部填充为0
        //index的值为:0,1,2,...,length-1。加上left即为当前显示的页数:
        //left,left+1,left+2,...,left+length-1
        .map((dummy, index) => index + left)
        //max为最大页数,过滤出小于最大页数的页数。
        //比如最大页数为22,length为7，当left为17时，就会把17+6=23过滤掉
        //pages里面还有[17,18,19,20,21,22]
        .filter(i => i <= max);

    if (pages.length < Number(length)) {//当pages里面的页数少于给定的页数时
        const padCount = Number(length) - pages.length;//计算出比给定的少几页

        //补全前面缺失的页数
        const missing = pages[0] - padCount;//需要从多少开始补
        const missPages = new Array(padCount)
            .fill(0)
            .map((dummy, index) => missing + index)
            .filter(el => el > 0);
        pages = [...missPages, ...pages];//将补全部分打散，和上面的pages拼成完整的pages
    }
    /*
    |-------------------------------------------------------
    | pages[0]=Math.max(1, current - Math.floor(Number(length) / 2))
    | 即，在刚开始时，当current<=Math.floor(Number(length) / 2+1时，pages[0]=1
    | 比如，length=7,当current<5时，pages[0]=1
    |-------------------------------------------------------
    | 下面用于显示中间部分及结尾的页数即：1...,x-length/2,...,x-2,x-1,x,x+1,x+2,...,x+length/2,...max
    |
    */
    if (pages[0] && pages[0] > 1) {
        pages.shift();//删除左侧一页，本来显示7页，现在变成6页
        pages.unshift(null);//添加左侧...的位置
        pages.unshift(1);//添加首页的位置
    }
    if (pages[pages.length - 1] < Number(max)) {
        pages.pop();
        pages.push(null);//添加右侧...位置
        pages.push(Number(max));//添加尾页位置
    }
}




