# 第一课

# 定义
<a style="color:#0366d6" href="https://en.wikipedia.org/wiki/SQL">SQL</a>:全称Structured Query Language:
- Structured：在查询过程中，查询语句可以一层层展开或嵌套
- Query：CRUD操作：Create-insert&emsp;Read-select Update-update&emsp;Delete-delete
- Language：一门编程语言
<h3>小知识扩展</h3>
<em>版本知识</em>

- 目前各个厂商都有自己版本的SQL，但又多多少少兼容标准ISO标准的SQL语法。常见的：T-SQL[微软]、PL/SQL[OracleDB]、MySQL等。    
  
- NoSQL[Not-Only-SQL]如：MongoDB(document based datebase)不用SQL查询语言。又如大数据里的HIVE可以用SQL查询也可以不用。
    
<em>DDL和DML</em>

- DDL：整个数据库脚本化，到新机器执行一遍数据就回来了。主要是Admin使用
- DML：操作数据。可以通过备份的方式移动到新机器。主要是Developer使用。    
# 数据库
## DBMS
DBMS指```DateBase Management System```。例如用微软的T-SQL编程就使用SQL Server数据库管理软件。常见的有：Oracle DB,MySQL。一个数据库即一个或多个数据文件，DBMS即帮助管理以及用SQL语言查询这些文件。当打开如MySQL workbench,SQL Server Management Studio等只是客户端。并非真正的DBMS。真正的DBMS在系统服务中，无法直接交互。具体流程图如下(以SSMS->SQL Server Management Studio)为例：     
<img src="http://xzdry.net:5080/api/media/1552445540090-%E6%93%8D%E4%BD%9C%E6%95%B0%E6%8D%AE%E5%BA%93%E6%B5%81%E7%A8%8B%E5%9B%BE.png">
# 具体操作
### 引入示例数据库
由于安装原因，打开workbench后并不能连接到示例数据库。需要打开cmd，之后进入到```E:\MySQL\Engine\bin>mysqld```目录下。输入：
```Bash
mysqld --console
# 此时已经连接上了数据库
```
之后另开一个cmd,依然进入到此目录下，输入：```mysql -u root -p```即可开始操作。如下图:
<img src="http://localhost:1234/api/media/1552470689182-%E8%BF%9E%E6%8E%A5MySQL%20minitor.png">     
输入help可以查看相关的命令，常用的有exit[退出]、source[执行SQL脚本]。附上图：
<img src="http://localhost:1234/api/media/1552471054318-MySQL%20Help.png">          
之后就可以连接示例数据库：
```Bash
source C:\Users\28933\Desktop\MySQL Practice\world.sql #连接world示例数据库
#连接sakila数据库时要注意，需要先执行sakila-schema.sql脚本
source C:\Users\28933\Desktop\MySQL Practice\sakila-schema.sql #先执行此条
source C:\Users\28933\Desktop\MySQL Practice\sakila-data.sql
```
当然，也可以使用UI界面来进行操作：
<img src="http://localhost:1234/api/media/1552471502890-%E8%BF%9E%E6%8E%A5MySQL%E7%A4%BA%E4%BE%8B%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84UI%E6%93%8D%E4%BD%9C.png">

# 第二课
## 建表
### 类型间的区别
以char为例。如果是变长的，用vchar(variable char)。      
定长的好处是，如果知道长度，可以在系统中对齐，查询性能就会高。但是有可能会产生硬盘空间浪费。比如预计nchar预订为10，但是存储很多长度只有1-2的空的地方，系统会在不足的地方填充空格，使其达到响应的长度，就会浪费很多空间。      
n表示存储的为```Unicode```数据类型的字符。英文字符只需要一个字节存储就够了。但汉字需要两个字节存储。n即为使用Unicode字符集。具体见下图：

在计算机领域中，以空间换时间是很常见。  

列表中常见的参数解释：
- PK: Primeray Key主键。在表中是唯一值。可以使用主键来进行查询。主键的排序也决定了整张表在存储空间中存储的顺序。主键对一张表的查询性能非常关键。主键可以由两列组成复合主键。如```姓+名```做主键。主键不能为null。
- Auto Increment 如果不勾此项，必须指定值。勾选会自动递增。
- Indexs 索引，不是很懂。原话为，在表之外的某个空间建立一块排好序数据，可以使用二分查找。用于辅助查找某一列的数据(某些经常需要查找的数据)。会使增删数据变慢。会使查询某些特定数据变快。

### 增删查改
- 查找和删除
```mysql
select * from `customer` #查找customer表中的所有数据
delete from customer where `xxx`='xxx' #删除表中`xxx`='xxx'的数据，不填where则为删除整个表。
update customer  set is_male=null where id=2;同上，不填where会更新整个表对应的数据。
```
- 插入
```mysql
INSERT INTO `customer`
(`name`,`birthday`,`is_male`)
values
('dry1','2010-05-28',1),
('dry2','1994-08-05',1);
```
或
```mysql
INSERT INTO `customer` values
('2','董若愚1','1994-07-07',1),
('3','董若愚2','1994-07-07',1);
```
区别是后者需要连id在内的所有项都对应写上数据。

## 查询操作
### select
```mysql
use world;
#select
#不跟from
select 1+1 as result; #可以当计算器
set @var=100; #设置变量
select @var as result;

#跟from
select `code` as c,`name` as n from country;#搜索code和name两列，分别命名为c和n列
select concat('[',`code`,',',`name`,']') as `combine` from country;#生成计算列combine，格式为[name,code]
select `name`,`Population`,round(`Population`/1000) as K from country;#计算列，以K为单位
```
### orderby
```mysql
use world;
select `name`,`Population`,floor(`Population`/1000) as K from country
order by K,`name` desc;#先按K排，然后按name排序。orderby可以按列的别名排，也可以按计算列排序


select `name`,`Population`,`continent`,floor(`Population`/1000) as K from country
where Population<1000 and `Continent`='Oceania' #这里where K=0就不行。
order by K,`name` desc;#先按K排，然后按name排序。orderby可以按列的别名排，也可以按计算列排序
```
