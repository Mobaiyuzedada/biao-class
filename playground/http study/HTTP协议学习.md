# 网络知识简介
## 经典五层模型
图：
<img src="http://xzdry.net:5080/api/media/1553671795226-%E7%BB%8F%E5%85%B8%E4%BA%94%E5%B1%82%E6%A8%A1%E5%9E%8B.png">     
```HTTP协议```需要基于网络中最重要的一个协议：```TCP协议```。涉及到HTTP请求的性能，过程中消耗。     
## 传输层
- 有两个协议：TCP/IP协议和UDP协议。更多情况下使用的是TCP/IP协议
- 本层向用户提供可靠的端到端(End-to-End)服务
- 传输层向高层屏蔽了下层数据通信的细节。比如输入URL就是屏蔽了细节之后的操作。再比如使用Ajax传输大的数据，一次传输不完。如何进行传输，可靠的与服务器交互，就是这一层的工作。   

## 应用层
- 为应用软件提供了很多服务，比如new XML HttpRequest()等
- 构建于TCP协议之上
- 屏蔽了网络传输的相关细节

# HTTP历史
第一个定稿的HTTP协议是```HTTP/0.9```。具有以下特点：
- 只有一个命令GET
- 没有HEADER等描述数据的信息
- 服务器发送完毕，就关闭TCP连接。同一个TCP连接里，可以发送多个HTTP请求。在HTTP1.0,2.0中已经实现    
## HTTP/1.0
- 增加了很多命令，如POST,PUT等
- 增加了status code和header
- 多字符集支持、多部分发送、权限、缓存等
## HTTP/1.1(目前广泛使用)
- 持久连接。提升性能
- pipeline
- 增加了host和其它一些命令。可以在同一台屋里服务器跑多个不同的web服务，比如Java和node的服务器。请求的具体是哪一个服务器可以通过host来区分
## HTTP/2.0(未来)
- 所有数据以二进制传输
- 同一个连接里面发送多个请求不再需要按照顺序来
- 头信息压缩以及推送等提高效率的功能

# HTTP的三次握手
在客服端和服务端进行HTTP请求的发送和返回的过程中，需要创建一个```TCP connection```。因为HTTP不存在连接的概念。只有请求和响应，两者都是数据包，需要一个传输通道。TCP connection会一直保持(1.1)，可以发送多个HTTP请求。在这个过程中会现有三次握手的消耗，之后才会创建TCP connection。
## 三次握手
如图：
<img src="http://xzdry.net:5080/api/media/1553673699765-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E6%97%B6%E5%BA%8F%E5%9B%BE.png">    
因为网络传输是有延时的，因此三次握手是为了防止server端开启无用连接。确认client端和server端的连接。

# URI URL URN
- URI Uniform Resource Identifier 统一资源标识符。用来唯一标识互联网上的信息资源。包括URL和RUN
- URL Uniform Resource Locator 统一资源定位器