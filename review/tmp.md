最近想要学习```Shell```语言以及```linux```操作。安装双系统比较麻烦。把系统装到移动硬盘又怕把硬盘弄坏。毕竟现在没钱没工作，禁不起折腾。最后还是选择回到了win10子系统这个方案。
          
很早的时候折腾过一次，那次是为了安装一个好用的shell即zsh。最后以失败告终。这次终于安装成功。应该勉强够用了，流畅度显然比不上直接在win10上操作，毕竟是远程连接。   
             
主要流程是参考这篇文章：<a href="https://blog.csdn.net/li528405176/article/details/82263534" style="color:#0366d6">win10创建Ubuntu16.04子系统，安装常用软件以及图形界面（包括win10远程桌面连接Ubuntu）</a>    
基本流程和此文章一致。只是文章一开始说不要用```阿里源```，但是后面安装图形界面的时候会缺少依赖，换了诸如清华源，网易源都不行。最后还是换回了阿里源。这次安装，会告诉我要安装xxx等依赖文件。
然后就是数以万计的安装，真是一个十分致郁的过程。最后用了我C盘大概4G左右的内存（心在滴血），终于捣腾好了。之后打开远程连接：输入```10.0.0.2:3090```。就可以进入ubuntu图形桌面了: