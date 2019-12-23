# JavaScript

* [JavaScript简介](#JavaScript简介)
  * [什么是语言](#什么是语言)
  * [简史](#简史)
  * [实现](#实现)
  * [特点](#特点)
* [JavaScript基本语法](#JavaScript基本语法)
* [JavaScript对象](#JavaScript对象)
* [DOM](#DOM)
* [事件](#事件)
* [BOM](#BOM)


## JavaScript简介

### 什么是语言

* 计算机就是一个由人来控制的机器,人让它干嘛,它就得干嘛。
* 我们要学习的语言就是人和计算机交流的工具,人类通过语言来控制、操作计算机。
* 编程语言和我们说的中文、英文本质上没有区别,只是语法比较特殊。
* 语言的发展:
  * 纸带机:机器语言
  * 汇编语言:符号语言 
  * 现代语言:高级语言
  
### 简史

* JavaScript是由网景公司发明,起初命名为LiveScript,后来由于SUN公司的介入更名为了JavaScript。
* 1996年微软公司在其最新的IE3浏览器中引入了自己对JavaScript的实现JScript。
* 于是在市面上存在两个版本的JavaScript,一个网景公司的JavaScript和微软的JScript。
* 为了确保不同的浏览器上运行的JavaScript标准一致,所以几个公司共同定制了JS的标准名命名为ECMAScript。

### 实现

* ECMAScript是一个标准,而这个标准需要由各个厂商去实现。 
* 不同的浏览器厂商对该标准会有不同的实现。

  |浏览器            |  JavaScript实现方式 |
  |:----------------|:------------------|
  |FireFox           |  SpiderMonkey |
  |Internet Explorer |  JScript/Chakra |
  |Safari            |  JavaScriptCore |
  |Chrome            |  v8 |
  |Carakan           |  Carakan |
  
* 我们已经知道ECMAScript是JavaScript标准,所以一般情况下这两个词我们认为是一个意思。
* 但是实际上JavaScript的含义却要更大一些。
* 一个完整的JavaScript实现应该由以下三个部分构成:
  
  ![JavaScript构成](images/java_script.png)
  
###  特点

* 解释型语言
  * JavaScript是一门解释型语言,所谓解释型值语言不需要被编译为机器码在执行,而是直接执行。
  * 由于少了编译这一步骤,所以解释型语言开发起来尤为轻松,但是解释型语言运行较慢也是它的劣势。
  * 不过解释型语言中使用了JIT技术,使得运行速度得以改善。
* 类似于C和Java的语法结构
  * JavaScript的语法结构与C和Java很像,向for、if、while等语句和Java的基本上是一模一样的。
  * 所以有过C和Java基础的同学学习起来会轻松很多。
  * 不过JavaScript和与Java的关系也仅仅是看起来像而已。
* 动态语言
  * JavaScript是一门动态语言,所谓的动态语言可以暂时理解为在语言中的一切内容都是不确定的。比如一个变量,这一时刻是个整型,下一时刻可能会变成字符串了。
  * 不过在补充一句动态语言相比静态语言性能上要差一些,不过由于JavaScript中应用的JIT技术,所以JS可能是运行速度最快的动态语言了。
* 基于原型的面向对象
  * JavaScript是一门面向对象的语言。
  * Java也是一门面向对象的语言,但是与Java不同JavaScript是基于原型的面向对象。


## JavaScript基本语法

## JavaScript对象

## DOM

## 事件

## BOM
