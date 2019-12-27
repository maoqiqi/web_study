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

事件指的就是用户与浏览器交互的一瞬间。

### 事件处理程序

* 我们可以通过两种方式为一个元素绑定事件处理程序: 
  * 通过HTML元素指定事件属性来绑定
    * 通过HTML属性来绑定事件处理程序是最简单的方式。
      
      ```
      <button onclick="alert('hello');alert('world')">按钮</button>
      ```
      
    * 这种方式当我们点击按钮以后,onclick属性中对应的JS代码将会执行,也就是点击按钮以后,页面中会弹出两个提示框。
    * 这种方式我们直接将代码编写到了onclick属性中,可以编写多行js代码,当然也可以事先在外部定义好函数。
    * 这种方式的优点在于,设定步骤非常简单,并且能够确保事件处理程序会在载入时被设定。
    * 如果在函数的最后return false则会取消元素的默认行为。
  * 通过DOM对象指定的属性来绑定
    * 但是其实上面的写法虽然简单,但却将JS和HTML的代码编写到了一起,并不推荐使用,我们更推荐如下的写法:
      
      ```
      var btn = document.getElementById('btn'); btn.onclick = function(){
        alert("hello"); 
      };
      ```
      
    * 这种写法将HTML代码和JS写在不同的位置,维护起来更加容易。
* 这两种方式都是我们日常用的比较多的,但是更推荐使用第二种方式。
* 还有一种方式比较特殊我们称为设置事件监听器。使用如下方式:
  * 元素对象.addEventListener()
    * 前边两种方式都可以绑定事件处理程序,但是它们都有一个缺 点就是都只能绑定一个程序,而不能为一个事件绑定多个程序。
    * 这是我们就可以使用addEventListener()来处理,这个方法需 要两个参数:一个是事件字符串,一个是响应函数。
      
      ```
      btn.addEventListener('click' , function(){alert("hello");});
      ```
      
    * 但是要注意的是ie8以下的浏览器是不支持上边的方法的,需要 使用attachEvent代替。
    * 也可以使用removeEventListener()和detachEvent()移除事件。
 
### 事件处理中的this

* 在事件处理程序内的 this 所引用的对象即 是设定了该事件处理程序的元素。
* 也就是事件是给那个对象绑定的this就是哪 个对象。

### 事件对象

* 在DOM对象上的某个事件被触发时,会产生一个 事件对象Event,这个对象中包含着所有事件有关 的信息。包括导致事件的元素、事件的类型以及其 他与特定事件相关的信息。
* 例如,鼠标操作导致的事件对象中,会包含鼠标位 置的信息,而键盘操作导致的事件对象中,会包含 与按下的键有关的信息。所有浏览器都支持 event 对象,但支持方式不同。
* DOM标准的浏览器会将一个event对象传入到事件的处理程序 当中。无论事件处理程序是什么都会传入一个event对象。
* 可以通过这种方式获取:
  
  ```
  btn.onclick = function(event){ alert(event.type);
  };
  ```
  
* Event对象包含与创建它的特定事件有关的属性和方法。触发 的事件类型不一样,可用的属性和方法也不一样。


Event对象的通用属性/方法
 
| 属性/方法                    | 类型      | 读/写     | 说明 |
|:---------------------------|:---------|----------|------|
| bubbles                    | Boolean  | 只读      | 事件是否冒泡 |
| cancelable                 | Boolean  | 只读      | 是否可以取消事件的默认行为 |
| currentTarget              | Element  | 只读      | 当前正在处理的事件元素 |
| defaultPrevented           | Boolean  | 只读      | 是否调用了preventDefault() |
| detail                     | Number   | 只读      | 与事件相关的细节信息 |
| eventPhase                 | Number   | 只读      | 阶段 1:捕获 2:目标 3:冒泡 |
| preventDefault()           | Function | 只读      | 取消事件的默认行为 |
| stopImmediatePropagation() | Function | 只读      | 取消事件的进一步捕获或冒泡 |
| stopPropagation()          | Function | 只读      | 取消事件的进一步捕获或冒泡 |
| target                     | Element  | 只读      | 事件的目标 |
| trusted                    | Boolean  | 只读      | 是否是浏览器内置事件 |
| type                       | String   | 只读      | 被触发的事件的类型 |

## BOM

### 什么是BOM

* ECMAScript无疑是JavaScript的核心，但是要想在浏览器中使用JavaScript，那么BOM(浏览器对象模型)才是真正的核心。
* BOM 提供了很多对象，用于访问浏览器的功能，这些功能与任何网页内容无关。
* BOM将浏览器中的各个部分转换成了一个一个的对象，我们通过修改这些对象的属性，调用他们的方法，从而控制浏览器的各种行为。

### window对象
* window对象是BOM的核心，它表示一个浏览器的实例。 
* 在浏览器中我们可以通过window对象来访问操作浏览器，同时window也是作为全局对象存在的。 
* 全局作用域:
  * window对象是浏览器中的全局对象，因此所有在全局作用 域中声明的变量、对象、函数都会变成window对象的属性 和方法。
  
###  窗口大小

* 浏览器中提供了四个属性用来确定窗口的大小:
  – 网页窗口的大小 
  * innerWidth
  * innerHeight
  – 浏览器本身的尺寸 
  * outerWidth
  * outerHeight
  
### 打开窗口
* 使用 window.open() 方法既可以导航到一个 特定的 URL，也可以打开一个新的浏览器窗口。
* 这个方法需要四个参数: 
  * 需要加载的url地址
  * 窗口的目标
  * 一个特性的字符串
  * 是否创建新的历史记录
  
### 超时调用
* 超时调用:
  * setTimeout()
  * 超过一定时间以后执行指定函数
  * 需要连个参数: 
        * 要执行的内容
        * 超过的时间
* 取消超时调用
  * clearTimeout()
* 超时调用都是在全局作用域中执行的。

### 间歇调用

* 间歇调用:
  * setInterval()
  * 每隔一段时间执行指定代码
  * 需要两个参数: 
        * 要执行的代码
        * 间隔的时间
* 取消间隔调用:
  * clearInterval()

  
### 系统对话框

* 浏览器通过 alert() 、 confirm() 和 prompt() 方法可以调用系统对话框向用户显示消息。
  * alert()接收一个字符串并显示给用户。调用 alert()方法会向用户显示一个包含一个确认 按钮的对话框。
  * 例如:alert("Hello World");
  
  * confirm和alert类似，只不过confirm弹出的对话 框有一个确认和取消按钮。用户可以通过按钮来 确认是否执行操作。
  * 例如:confirm('你确定吗?');
  * 这个函数的执行会返回一个布尔值，如果选择确 定则返回true，如果点击取消则返回false。
  
  * prompt会弹出一个带输入框的提示框，并 可以将用户输入的内容返回。
  * 它需要两个值作为参数: 
    * 显示的提示文字
    * 文本框中的默认值
  * 例子:prompt('你的年龄是?','18');
   
* 它们的外观由操作系统及(或)浏览器设置决 定，而不是由 CSS 决定。
* 显示系统对话框时会导致程序终止，当关闭对 话框程序会恢复执行。

### location对象
* location对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导 航功能。
* href属性:href属性可以获取或修改当前页面的完整的URL地址，使浏览器跳转到指定页面。
* assign() 方法：所用和href一样，使浏览器跳转页面，新地址错误参数传递到assign ()方法中
* replace()方法：功能一样，只不过使用replace方法跳转地址不会体现到历史记录中。
* reload() 方法： 用于强制刷新当前页面

### navigator对象
* navigator 对象包含了浏览器的版本、浏览 器所支持的插件、浏览器所使用的语言等 各种与浏览器相关的信息。
* 我们有时会使用navigator的userAgent属 性来检查用户浏览器的版本。

### screen对象
* screen 对象基本上只用来表明客户端的能 力，其中包括浏览器窗口外部的显示器的 信息，如像素宽度和高度等。
* 该对象作用不大，我们一般不太使用。

###  history对象
* history 对象保存着用户上网的历史记录， 从窗口被打开的那一刻算起。
* go()使用 go() 方法可以在用户的历史记录中任意跳转，可以向后也可以向前。
* back()向后跳转
* forward()向前跳转

### document
* document对象也是window的一个属性， 这个对象代表的是整个网页的文档对象。
* 我们对网页的大部分操作都需要以 document对象作为起点。
* 关于document对象的内容，我们后边还要 具体讲解。