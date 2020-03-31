# 

## 目录

* [let](#let)
  * [基本用法](#基本用法)
  * [块级作用域](#块级作用域)
    * [为什么需要块级作用域](#为什么需要块级作用域)
      * [内层变量可能会覆盖外层变量](#内层变量可能会覆盖外层变量)
      * [用来计数的循环变量泄露为全局变量](#用来计数的循环变量泄露为全局变量)
    * [ES6的块级作用域](#ES6的块级作用域)
    * [块级作用域与函数声明](#块级作用域与函数声明)
* [const](#const)
  * [ES6声明变量的六种方法](#ES6声明变量的六种方法)
* [顶层对象的属性](#顶层对象的属性)
* [globalThis](#globalThis)
* [变量的解构赋值](#变量的解构赋值)


## let

### 基本用法

ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```
{
  var a = 'a'
  let b = 'b'
}

console.log(a) // 1
// let声明的变量只在它所在的代码块有效
console.log(b)// ReferenceError: a is not defined.
```

for循环的计数器，就很合适使用let命令。

```
for (let i = 0; i < 10; i++) {
  console.log(i)
}
// 计数器i只在for循环体内有效，在循环体外引用就会报错
console.log(i) // ReferenceError: i is not defined
```

下面的代码如果使用var，最后输出的是10。

```
var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}
a[6]() // 10
```

上面代码中，变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。
每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。
也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。

如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6。

另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```
for (let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i)
}
// abc
// abc
// abc
```

上面代码正确运行，输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。

#### 不存在变量提升

var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```
// var 的情况
console.log(foo) // 输出undefined
var foo = 2

// let 的情况
console.log(bar) // 报错ReferenceError
let bar = 2
```

上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。
变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。

#### 暂时性死区

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```
var tmp = 123

{
  tmp = 'abc' // ReferenceError
  let tmp
}
```

上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

#### 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

```
// 报错
function func() {
  let a = 10
  var a = 1
}
```

因此，不能在函数内部重新声明参数。

```
function func(arg) {
  let arg
}
func() // 报错

function func(arg) {
  {
    let arg
  }
}
func() // 不报错
```

### 块级作用域

#### 为什么需要块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

##### 内层变量可能会覆盖外层变量

```
var n = 5

function f1() {
  if (true) {
    var n = 10
  }
  console.log(n) // 10
}

f1()
```

##### 用来计数的循环变量泄露为全局变量

```
var s = 'hello'

for (var i = 0; i < s.length; i++) {
  console.log(s[i])
}

console.log(i) // 5
```

#### ES6的块级作用域

let实际上为 JavaScript 新增了块级作用域。

```
let n = 5

function f1() {
  if (true) {
    let n = 10
  }
  console.log(n) // 5
}

f1()
```

ES6 允许块级作用域的任意嵌套。

```
{{{{
  {
    let insane = 'Hello World'
  }
  console.log(insane) // 报错
}}}}
```

内层作用域可以定义外层作用域的同名变量。

```
{{{{
  let insane = 'Hello World'
  {
    let insane = 'Hello World'
  }
}}}}
```

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

```
// IIFE 写法
(function () {
  var tmp = ''
}())

// 块级作用域写法
{
  let tmp = ''
}
```

#### 块级作用域与函数声明

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}
```

上面两种函数声明，根据 ES5 的规定都是非法的。

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

```
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());
```

上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。

```
// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
```

ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于let，对作用域之外没有影响。
但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？

```
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function
```

上面的代码在 ES6 浏览器中，都会报错。

原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。
为了减轻因此产生的不兼容问题，ES6 规定浏览器的实现可以不遵守上面的规定，有自己的行为方式。

* 允许在块级作用域内声明函数。
* 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
* 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。

根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。上面的例子实际运行的代码如下。

```
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret'

  function f() {
    return a
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret'
  let f = function () {
    return a
  }
}
```

另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```
// 第一种写法，报错
if (true) let x = 1

// 第二种写法，不报错
if (true) {
  let x = 1
}
```

上面代码中，第一种写法没有大括号，所以不存在块级作用域，而let只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。

函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。

```
// 不报错
'use strict'
if (true) {
  function f() {
  }
}

// 报错
'use strict'
if (true)
  function f() {
  }
```


## const

* const声明一个只读的常量。一旦声明，常量的值就不能改变。
* const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
* const的作用域与let命令相同：只在声明所在的块级作用域内有效。
* const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
* const声明的常量，也与let一样不可重复声明。

### ES6声明变量的六种方法

ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，另外两种声明变量的方法：import命令和class命令。


## 顶层对象的属性

顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```
window.a = 1
a // 1

a = 2
window.a // 2
```

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，
只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。
另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；
另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```
var a = 1
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
console.log(window.a)// 1

let b = 1
console.log(window.b) // undefined
```


## globalThis

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

* 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
* 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
* Node 里面，顶层对象是global，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。

* 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
* 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
* 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。
  但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。
  
综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。

ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。


## 变量的解构赋值