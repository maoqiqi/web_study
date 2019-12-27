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
|：---------------------------|:---------|----------|------|
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
