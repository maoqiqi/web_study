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
  * [数组的解构赋值](#数组的解构赋值)
  * [对象的解构赋值](#对象的解构赋值)
  * [字符串的解构赋值](#字符串的解构赋值)
  * [数值和布尔值的解构赋值](#数值和布尔值的解构赋值)
  * [函数参数的解构赋值](#函数参数的解构赋值)
  * [圆括号问题](#圆括号问题)
  * [用途](#用途)
* [字符串的新增方法](#字符串的新增方法)
  * [String.fromCodePoint()](#stringfromcodepoint)
  * [String.raw()](#stringraw)
  * [codePointAt()](#codepointat)
  * [normalize()](#normalize)
  * [includes(), startsWith(), endsWith()](#includes-startswith-endswith)
  * [repeat()](#repeat)
  * [padStart()，padEnd()](#padstartpadend)
  * [trimStart()，trimEnd()](#trimstarttrimend)
  * [matchAll()](#matchall)


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

### 顶层对象的属性

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

### globalThis

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

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

### 数组的解构赋值

以前，为变量赋值，只能直接指定值。

```
let a = 1
let b = 2
let c = 3
```

ES6 允许写成下面这样。

```
let [a, b, c] = [1, 2, 3]
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

```
let [foo, [[bar], baz]] = [1, [[2], 3]]
foo // 1
bar // 2
baz // 3

let [, , third] = ['foo', 'bar', 'baz']
third // "baz"

let [x, , y] = [1, 2, 3]
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4]
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a']
x // "a"
y // undefined
z // []
```

如果解构不成功，变量的值就等于undefined。

对于 Set 结构，也可以使用数组的解构赋值。

```
let [x, y, z] = new Set(['a', 'b', 'c'])
console.log(x) // "a"
```

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

```
function* fibs() {
  let a = 0
  let b = 1
  while (true) {
    yield a;
    [a, b] = [b, a + b]
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs()
console.log(sixth) // 5
```

上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。

解构赋值允许指定默认值。

```
let [foo = true] = []
console.log(foo) // true

let [x, y = 'b'] = ['a'] // x='a', y='b'
let [x, y = 'b'] = ['a', undefined] // x='a', y='b'
```

注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```
function f() {
  console.log('aaa')
}

let [x = f()] = [1]
```

上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

```
let x
if ([1][0] === undefined) {
  x = f()
} else {
  x = [1][0]
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```
let [x = 1, y = x] = []     // x=1; y=1
let [x = 1, y = x] = [2]    // x=2; y=2
let [x = 1, y = x] = [1, 2] // x=1; y=2
let [x = y, y = 1] = []     // ReferenceError: y is not defined
```

上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。

### 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```
let {foo, bar} = {foo: 'aaa', bar: 'bbb'}
console.log(foo) // "aaa"
console.log(bar) // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

如果解构失败，变量的值等于undefined。

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```
const {log} = console
log('hello') // hello
```

如果变量名与属性名不一致，必须写成下面这样。

```
let {foo: baz} = {foo: 'aaa', bar: 'bbb'}
console.log(baz) // "aaa"

let obj = {first: 'hello', last: 'world'}
let {first: f, last: l} = obj
console.log(f) // 'hello'
console.log(l) // 'world'
```

这实际上说明，对象的解构赋值是下面形式的简写。

```
let {foo: foo, bar: bar} = {foo: 'aaa', bar: 'bbb'}
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

与数组一样，解构也可以用于嵌套结构的对象。

```
let obj = {
  p: [
    'Hello',
    {y: 'World'},
  ],
}

let {p: [x, {y}]} = obj
console.log(x) // "Hello"
console.log(y) // "World"
```

注意，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。

```
let obj = {
  p: [
    'Hello',
    {y: 'World'},
  ],
}

let {p, p: [x, {y}]} = obj
console.log(x) // "Hello"
console.log(y) // "World"
console.log(p) // ["Hello", {y: "World"}]
```

下面是嵌套赋值的例子。

```
let obj = {}
let arr = [];

({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true})

console.log(obj) // {prop:123}
console.log(arr) // [true]
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```
let {foo: {bar}} = {baz: 'baz'}
```

上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错。

注意，对象的解构赋值可以取到继承的属性。

```
const obj1 = {}
const obj2 = {foo: 'bar'}
Object.setPrototypeOf(obj1, obj2)

const {foo} = obj1
console.log(foo) // "bar"
```

上面代码中，对象obj1的原型对象是obj2。foo属性不是obj1自身的属性，而是继承自obj2的属性，解构赋值可以取到这个属性。

对象的解构也可以指定默认值。

```
let {x = 3} = {}
x // 3

let {x, y = 5} = {x: 1}
x // 1
y // 5

let {x: y = 3} = {}
y // 3

let {x: y = 3} = {x: 5}
y // 5

let {message: msg = 'Something went wrong'} = {}
msg // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于undefined。

**注意点**：

* 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

  ```
  // 错误的写法
  let x
  {x} = {x: 1}
  // SyntaxError: syntax error
  ```
  
  上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
  只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
  
  ```
  // 正确的写法
  let x;
  ({x} = {x: 1})
  ```
  
  上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。
  
* 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
  
  ```
  ({} = [true, false]);
  ({} = 'abc');
  ({} = [])
  ```
  
  上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

* 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
  
  ```
  const arr = [1, 2, 3]
  let {0: first, [arr.length - 1]: last} = arr
  console.log(first) // 1
  console.log(last) // 3
  ```

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```
const [a, b, c, d, e] = 'hello'
// a = h , b =  e , c =  l , d =  l , e =  o
console.log('a =', a, ', b = ', b, ', c = ', c, ', d = ', d, ', e = ', e)
```

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```
let {length: len} = 'hello'
console.log(len) // 5
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```
let {toString: s1} = 123
console.log(s1 === Number.prototype.toString) // true

let {toString: s2} = true
console.log(s2 === Boolean.prototype.toString) // true
```

上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

```
let {prop: x} = undefined // TypeError
let {prop: y} = null // TypeError
```

### 函数参数的解构赋值

```
function add([x, y]) {
  return x + y
}

add([1, 2]) // 3
```

上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。

函数参数的解构也可以使用默认值。undefined就会触发函数参数的默认值。

```
[1, undefined, 3].map((x = 'yes') => x)
// [ 1, 'yes', 3 ]
```

### 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

**不能使用圆括号的情况**

* 变量声明语句
* 函数参数
* 赋值语句的模式

**不能使用圆括号的情况**

可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```
[(b)] = [3]; // 正确
({p: (d)} = {}); // 正确
[(parseInt.prop)] = [3] // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。
第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。

### 用途

* 交换变量的值
  
  ```
  let x = 1
  let y = 2;

  [x, y] = [y, x]
  ```
  
* 从函数返回多个值
  
  ```
  // 返回一个数组
  function example1() {
    return [1, 2, 3]
  }
  let [a, b, c] = example1()

  // 返回一个对象
  function example2() {
    return {
      foo: 1,
      bar: 2,
    }
  }
  let {foo, bar} = example2()
  ```
  
* 函数参数的定义
  
  ```
  // 参数是一组有次序的值
  function f1([x, y, z]) {
    console.log(x, y, z)
  }
  f1([1, 2, 3])

  // 参数是一组无次序的值
  function f2({x, y, z}) {
    console.log(x, y, z)
  }
  f2({z: 3, y: 2, x: 1})
  ```
  
* 提取 JSON 数据
  
  ```
  let jsonData = {
    id: 42,
    status: 'OK',
    data: [867, 5309],
  }
  let {id, status, data: number} = jsonData
  console.log(id, status, number)// 42, "OK", [867, 5309]
  ```
  
* 函数参数的默认值
  
  ```
  jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  } = {}) {
    // ... do stuff
  };
  ```
  
* 遍历 Map 结构
  
  ```
  const map = new Map()
  map.set('first', 'hello')
  map.set('second', 'world')

  for (let [key, value] of map) {
    console.log(key + ' is ' + value)
  }
  // first is hello
  // second is world
  ```
  
  如果只想获取键名，或者只想获取键值，可以写成下面这样。
  
  ```
  // 获取键名
  for (let [key] of map) {
    // ...
  }

  // 获取键值
  for (let [, value] of map) {
    // ...
  }
  ```
  
* 输入模块的指定方法

  加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
  
  ```
  const {SourceMapConsumer, SourceNode} = require('source-map')
  ```


## 字符串的新增方法

### String.fromCodePoint()
### String.raw()
### codePointAt()
### normalize()
### includes(), startsWith(), endsWith()
### repeat()
### padStart()，padEnd()
### trimStart()，trimEnd()
### matchAll()