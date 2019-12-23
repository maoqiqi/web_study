function move(obj, attr, target, speed, callback) {
    // 关闭上一个定时器
    clearInterval(obj.timer);
    // 获取元素目前的位置
    const current = parseInt(getStyle(obj)[attr]);
    console.log("current = " + current);

    // 判断速度的正负值
    if (current > target) {
        speed = -speed;
    }

    // 开启一个定时器,用来执行动画效果
    obj.timer = setInterval(function () {
        let newValue = parseInt(getStyle(obj)[attr]) + speed;
        console.log("newValue = " + newValue);
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        obj.style[attr] = newValue + "px";
        if (newValue === target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}

function getStyle(obj) {
    if (window.getComputedStyle) {
        // 正常浏览器的方式,具有getComputedStyle()方法
        return getComputedStyle(obj, null);
    } else {
        // IE8的方式,没有getComputedStyle()方法
        return obj.currentStyle;
    }
}