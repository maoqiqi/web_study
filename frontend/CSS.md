# CSS


## 目录

* [CSS概述](#CSS概述)
* [CSS选择器](#CSS选择器)
  * [基本选择器及其扩展](#基本选择器及其扩展)
    * [ID选择器](#ID选择器)
    * [类选择器](#类选择器)
    * [元素选择器](#元素选择器)
    * [复合选择器](#复合选择器)
    * [群组选择器](#群组选择器)
    * [后代选择器](#后代选择器)
    * [子元素选择器](#子元素选择器)
    * [兄弟选择器](#兄弟选择器)
    * [通用选择器](#通用选择器)
  * [伪类与伪元素选择器](#伪类与伪元素选择器)
    * [链接伪类](#链接伪类)
    * [动态伪类](#动态伪类)
    * [表单伪类](#表单伪类)
    * [结构性伪类](#结构性伪类)
    * [伪元素](#伪元素)
    * [否定伪类](#否定伪类)
  * [属性选择器](#属性选择器)
* [继承](#继承)
* [选择器的权重](#选择器的权重)
  * [权重的计算](#权重的计算)


## CSS概述

什么是CSS？
 
* 层叠样式表 (Cascading Style Sheets)
* css可以用来为网页创建样式表,通过样式表可以对网页进行装饰
* 所谓层叠,可以将整个网页想象成是一层一层的结构,层次高的将会覆盖层次低的
* 而css就可以分别为网页的各个层次设置样式

基本语法:

* CSS的样式表由一个一个的样式构成,一个样式又由选择器和声明块构成。
* 语法:选择器 {样式名:样式值;样式名:样式值 ; },例如:`p {color:red ; font-size:12px;}`

* 行内样式
  可以直接将样式写到标签内部的style属性中,这种样式不用填写选择器,直接编写声明即可
  ```
  <p style="color: red;font-size: 30px"></p>
  ```
  这种方式编写简单,定位准确。但是由于直接将css代码写到了html标签的内部,导致结构与表现耦合,同时导致样式不能够复用,所以这种方式我们不推荐使用。
* 内部样式表
  可以直接将样式写到<style>标签中
  ```
  <style type="text/css">
  p{color:red; font-size: 30px;}
  </style>
  ```
  这样使css独立于html代码,而且可以同时为多个元素设置样式,这是我们使用的比较多的一种方式。
  但是这种方式,样式只能在一个页面中使用,不能在多个页面中重复使用。
* 外部样式表
  可以将所有的样式保存到一个外部的css文件中,然后通过<link>标签将样式表引入到文件中。
  ```
  <link rel="stylesheet" type="text/css" href="style.css">
  ```
  这种方式将样式表放入到了页面的外部,可以在多个页面中引入,同时浏览器加载文件时可以使用缓存,这是我们开发中使用的最多的方式。


## CSS选择器

选择器(selector),会告诉浏览器:网页上的哪些元素需要设置什么样的样式。
比如:p这个选择器就表示选择页面中的所有的p元素,在选择器之后所设置的样式会应用到所有的p元素上。

### 基本选择器及其扩展

#### ID选择器

• ID选择器,可以根据元素的id属性值选取元素。
• 语法:`#id { }`
* 例子:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          #box1 {
              border: 1px solid deeppink;
          }
      </style>
  </head>
  <body>
  
  <div id="box1">我是box1</div>
  <div id="box2">我是box2</div>
  
  </body>
  </html>
  ```

#### 类选择器

* 类选择器,可以根据元素的class属性值选取元素。
* 语法:`.className { }`
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          .all {
              border: 10px double deeppink;
          }
      </style>
  </head>
  <body>
  
  <h1 class="all">我是h1标签</h1>
  <div class="all">我是div标签</div>
  <p class="all">我是p标签</p>
  
  <a href="#" class="all">我是a标签</a>
  <span class="all">我是span标签</span>
  <img class="all" src="img/logo.png" alt="logo">
  
  </body>
  </html>
  ```

#### 元素选择器

* 元素选择器(标签选择器),可以根据标签的名字来从页面中选取指定的元素。
* 语法:`标签名 { }`
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          div {
              border: 1px solid deeppink;
          }
  
          span {
              border: 1px solid blue;
          }
      </style>
  </head>
  <body>
  
  <div class="c1">我是c1</div>
  <div class="c2">我是c2</div>
  
  <span class="c1">我是c1</span>
  <span class="c2">我是c2</span>
  
  </body>
  </html>
  ```

#### 复合选择器

* 复合选择器,可以同时使用多个选择器,这样可以选择同时满足多个选择器的元素。
* 语法:`选择器1选择器2{}` 
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          div.c1 {
              border: 1px solid deeppink;
          }
      </style>
  </head>
  <body>
  
  <div class="c1">我是c1</div>
  <div class="c2">我是c2</div>
  
  <span class="c1">我是c1</span>
  <span class="c2">我是c2</span>
  
  </body>
  </html>
  ```

#### 群组选择器

* 群组选择器,可以同时使用多个选择器,多个选择器将被同时应用指定的样式。
* 语法:`选择器1,选择器2,选择器3 { }`
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          .c1, .c2 {
              margin: 10px;
              border: 1px solid deeppink;
          }
      </style>
  </head>
  <body>
  
  <div class="c1">我是c1</div>
  <div class="c2">我是c2</div>
  
  <span class="c1">我是c1</span>
  <span class="c2">我是c2</span>
  
  </body>
  </html>
  ```

#### 后代选择器

标签之间的关系:
* 祖先元素:直接或间接包含后代元素的元素。
* 后代元素:直接或间接被祖先元素包含的元素。
* 父元素:直接包含子元素的元素。
* 子元素:直接被父元素包含的元素。
* 兄弟元素:拥有相同父元素的元素。

* 后代选择器可以根据标签的关系,为处在元素内部的代元素设置样式。
* 语法:`祖先元素 后代元素 后代元素 { }`
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          div span {
              border: 1px solid deeppink;
          }
      </style>
  </head>
  <body>
  
  <div class="all">我是div标签 <span>我是span标签</span></div>
  
  <span>我是span标签</span>
  
  </body>
  </html>
  ```

#### 子元素选择器

* 子元素选择器可以给另一个元素的子元素设置样式。
* 语法:`父元素 > 子元素{}`
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          div > span {
              border: 1px solid deeppink;
          }
      </style>
  </head>
  <body>
  
  <div class="all">
      我是div标签
      <span>我是span标签</span>
      <p><span>我是span标签</span></p>
  </div>
  
  <span>我是span标签</span>
  
  </body>
  </html>
  ```

其他子元素选择器
• `:first-child`:选择第一个子标签
• `:last-child`:选择最后一个子标签
• `:nth-child`:选择指定位置的子元素
• `:first-of-type`:选择指定类型的第一个子元素
• `:last-of-type`:选择指定类型的最后一个子元素
• `:nth-of-type`:选择指定类型指定位置的子元素

#### 兄弟选择器

• 除了根据祖先父子关系,还可以根据兄弟 关系查找元素。
• 语法:
  * `兄弟元素 + 兄弟元素{}` 查找后边一个兄弟元素 
  * `兄弟元素 ~ 兄弟元素{}` 查找后边所有的兄弟元素
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          div + span {
              border: 1px solid deeppink;
          }
  
          a ~ span {
              border: 1px solid blue;
          }
      </style>
  </head>
  <body>
  
  <div class="all">
      <a href="#">我是a标签</a>
      <span>我是span标签</span>
      <span>我是span标签</span>
      <span>我是span标签</span>
      <p><span>我是span标签</span></p>
  </div>
  
  <span>我是span标签</span>
  
  </body>
  </html>
  ```

### 伪类与伪元素选择器

有时候,你需要选择本身没有标签,但是仍然易于识别的网页部位,比如段落首行或鼠标滑过的连接。CSS为他们提供一些选择器:伪类和伪元素。
给链接定义样式:有四个伪类可以让你根据访问者与该链接的交互方式,将链接设置成4种不同的状态。

#### 链接伪类

* `a:link`:正常链接
* `a:visited`:访问过的链接(只能定义字体颜色)

#### 动态伪类

* `a:hover`:鼠标滑过的链接
* `a:active`:正在点击的链接
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          a {
              text-decoration: none;
          }
  
          a:link, div:link {
              color: deeppink;
          }
  
          a:visited, div:visited {
              color: blue;
          }
  
          a:hover, div:hover {
              color: pink;
          }
  
          a:active, div:active {
              color: red;
          }
      </style>
  </head>
  <body>
  <a href="#">点我点我点我</a>
  <div>我是div啦</div>
  </body>
  </html>
  ```

#### 表单伪类

* `:focus`:获取焦点
* `:enabled`:
* `:disabled`:
* `:checked`:
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>Title</title>
  	<style type="text/css">
  
  		input:focus {
  			background: pink;
  		}
  
  		input:enabled {
  			background: blue;
  		}
  
  		input:disabled {
  			background: deeppink;
  		}
  
  		input:checked {
  			font-size: 80px;
  		}
  	</style>
  </head>
  <body>
  
  <label>输入框<input type="text"/></label>
  <label>不可点击<input type="text" disabled="disabled"/></label>
  <label>复选框<input type="checkbox"/></label>
  
  </body>
  </html>
  ```
  
#### 结构性伪类

* `:before`:指定元素前
* `:after`:指定元素后
* `:selection`:选中的元素
* 例如:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          #wrap {
              font: 30px/100px serif;
              background-color: lightgrey;
          }
  
          #wrap::before {
              display: inline-block;
              width: 50px;
              height: 50px;
              content: "";
              background: pink;
          }
  
          #wrap::after {
              display: inline-block;
              width: 50px;
              height: 50px;
              content: "";
              background: deeppink;
          }
  
          #wrap::selection {
              background-color: lightgreen;
          }
      </style>
  </head>
  <body>
  <div id="wrap">中国 ABC DEF GHI abc def ghi</div>
  </body>
  </html>
  ```

#### 伪元素

* `:first-letter`:首字母
* `:first-line`:首行
  
#### 否定伪类

* 否定伪类可以帮助我们选择不是其他东西的某件东西。
* 语法:`:not(选择器){}`
* 例如:

### 属性选择器

* 属性选择器可以挑选带有特殊属性的标签。
* 语法:
  * [属性名]
  * [属性名="属性值"]
  * [属性名~="属性值"]
  * [属性名|="属性值"]
  * [属性名^="属性值"]
  * [属性名$="属性值"]
  * [属性名*="属性值"]
* 例如:
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style type="text/css">
            div[name*="abc"] {
                border: 1px solid pink;
                margin: 10px;
            }
        </style>
    </head>
    <body>
    <div id="wrap">
        <div name="abc-def">abc-def</div>
        <div name="abc">abc</div>
        <div name="abc_def">abc_def</div>
        <div name="abc_def">abc_def</div>
        <div name="abc_">abc_</div>
    </div>
    </body>
    </html>
    ```

#### 通用选择器

* 通用选择器,可以同时选中页面中的所有元素。
* 语法:`*{ }`
* 例子:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style type="text/css">
          * {
              border: 1px solid pink;
              margin: 10px;
          }
      </style>
  </head>
  <body>
  
  <h1>我是h1标签</h1>
  <div>我是div标签</div>
  <p>我是p标签</p>
  
  <a href="#">我是a标签</a>
  <span>我是span标签</span>
  <img src="img/logo.png" alt="logo">
  
  </body>
  </html>
  ```
 

## 继承

* 就像父亲的财产会遗传给儿子一样,在CSS中祖先元素的样式同样也会被子元素继承。
* 继承是指应用在一个标签上的那些CSS样式会同时被应用到其内嵌标签上。
* 比如为父元素设置了字体颜色,子元素也会应用上相同的颜色。
* 当然并不是所有的样式都会被继承。


## 选择器的权重

在页面中使用CSS选择器选中元素时,经常都是一个元素同时被多个选择器选中。比如:`body h1` `h1`。
两个选择器都会选择h1元素,如果两个选择器设置的样式不一致那还好不会产生冲突,但是如果两个选择器设置的是同一个样式,这样h1到底要应用那个样式呢?
CSS中会默认使用权重较大的样式,权重又是如何计算的呢?

### 权重的计算

* 不同的选择器有不同的权重值:
  * 内联样式:权重是1000
  * id选择器:权重是100
  * 类、属性、伪类选择器:权重是10
  * 元素选择器:权重是1
  * 通配符:权重是0
* 计算权重需要将一个样式的全部选择器相加,比如上边的body h1的权重是20,h1的权重是10,所以第一个选择器设置的样式会优先显示。