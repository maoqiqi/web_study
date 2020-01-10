// 向一个元素中添加指定的class属性值
function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className = (obj.className + " " + cn).trim();
    }
}

// 判断一个元素中是否含有指定的class属性值
function hasClass(obj, cn) {
    const reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}

// 删除一个元素中的指定的class属性
function removeClass(obj, cn) {
    const reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "").trim();
}

// // 音乐样式
let playPauseElement = $(".march-play-pause");
let music2Element = playPauseElement[1];
let musicContentElement = $(".navbar .nav .march-music-content");
let musicUlElement = musicContentElement.children()[0];
let audio = $("#march-audio")[0];
let data;
let position = 0;

// // 鼠标进
// musicContentElement.mouseover(function () {
//     addClass(music2Element, "march-music-2-hover");
// });
// // 鼠标出
// musicContentElement.mouseout(function () {
//     removeClass(music2Element, "march-music-2-hover");
// });

// 读取音乐列表
const url = "data/music.json";
let request = new XMLHttpRequest();
request.open("get", url);
request.send(null);
request.onload = function () {
    if (request.status === 200) {
        data = JSON.parse(request.responseText);
        audio.src = data[position]["link"];
        createMusicList();
        playPauseElement.click(setPlayPause);
    }
};

// 播放列表
function createMusicList() {
    for (let i = 0; i < data.length; i++) {
        let aElement = document.createElement("a");
        let liElement = document.createElement("li");
        aElement.onclick = function (e) {
            console.log("下载");
            // e.preventDefault();
            // 阻止事件冒泡
            e.stopPropagation();
        };

        aElement.innerHTML = '<span class="glyphicon glyphicon-download-alt"></span>';
        liElement.innerHTML = data[i]["name"] + " - " + data[i]["author"];
        liElement.appendChild(aElement);

        if (i === position) addClass(liElement, "selected");
        liElement.index = i;
        liElement.onclick = switchMusic;
        musicUlElement.appendChild(liElement);
    }
}

// 切换音乐
function switchMusic() {
    removeClass(musicUlElement.children[position], "selected");
    position = this.index;
    addClass(musicUlElement.children[position], "selected");
    audio.src = data[position]["link"];
    setPlayPause();
}

// 设置播放暂停
function setPlayPause() {
    if (this instanceof Window || audio.paused) {
        audio.play();
        updatePlayPause(false);
    } else {
        audio.pause();
        updatePlayPause(true);
    }
}

// 更新按钮
function updatePlayPause(on) {
    if (on) {
        playPauseElement[0].children[0].className = "iconfont icon-music-off";
        playPauseElement[1].children[0].className = "iconfont icon-play";
    } else {
        playPauseElement[0].children[0].className = "iconfont icon-music";
        playPauseElement[1].children[0].className = "iconfont icon-pause";
    }
}

// 菜单
$("#dropdown-menu > li > a").click(function (e) {
    let href = $(this).attr("href");
    $("#tab-list > li > a[href='" + href + "']").tab("show");
    $(document).scrollTop($("#march-content").offset().top);
    // 关闭菜单
    let navbarBtn = $(".navbar .navbar-header button:first-child")[0];
    let navbarMenu = $(".navbar .collapse")[0];
    navbarBtn.className = "navbar-toggle collapsed";
    navbarMenu.className = "collapse navbar-collapse";
    e.preventDefault();
});

// 更多
$(".march-more").click(function () {
    $(".march-hide").show();
    $(this).hide();
});

// 滚动到顶部
function returnTop() {
    let timer = setInterval(function () {
        if ($(document).scrollTop() > 0) {
            window.scrollBy(0, -100);
        } else {
            clearInterval(timer);
        }
    }, 10);
}

// 智能滚动
function smartFloat(element, topDis, marginDis) {
    let scrollTop = Math.round(element.offset().top) - topDis - marginDis;
    let w = element.width();
    let h = element.height();
    console.log(w, h);
    $(window).scroll(function () {
        if (scrollTop - $(document).scrollTop() < 0) {
            element.css({
                width: w,
                height: h,
                position: "fixed",
                top: topDis + marginDis
            });
        } else {
            console.log("吨佛那个");
            element.css({
                position: "absolute",
                top: 0
            });
        }
    });
}

// 不给手机设置该功能
if (window.screen.width > 768) {
    smartFloat($(".march-smart-float"), 20, 20);
}

/*console.log(
    "屏幕分辨率为：" + screen.width + "*" + screen.height +
    "屏幕可用大小：" + screen.availWidth + "*" + screen.availHeight +
    "网页可见区域宽：" + document.body.clientWidth +
    "网页可见区域高：" + document.body.clientHeight +
    "网页可见区域宽(包括边线的宽)：" + document.body.offsetWidth +
    "网页可见区域高(包括边线的宽)：" + document.body.offsetHeight +
    "网页正文全文宽：" + document.body.scrollWidth +
    "网页正文全文高：" + document.body.scrollHeight +
    "网页被卷去的高：" + document.body.scrollTop +
    "网页被卷去的左：" + document.body.scrollLeft +
    "网页正文部分上：" + window.screenTop +
    "网页正文部分左：" + window.screenLeft +
    "屏幕分辨率的高：" + window.screen.height +
    "屏幕分辨率的宽：" + window.screen.width +
    "屏幕可用工作区高度：" + window.screen.availHeight +
    "屏幕可用工作区宽度：" + window.screen.availWidth
);*/

// 屏幕分辨率为：1920*1080
// 屏幕可用大小：1920*937
// 网页可见区域宽：1426
// 网页可见区域高：3134
// 网页可见区域宽(包括边线的宽)：1426
// 网页可见区域高(包括边线的宽)：3134
// 网页正文全文宽：1426
// 网页正文全文高：3134
// 网页被卷去的高：0
// 网页被卷去的左：0
// 网页正文部分上：23
// 网页正文部分左：0
// 屏幕分辨率的高：1080
// 屏幕分辨率的宽：1920
// 屏幕可用工作区高度：937
// 屏幕可用工作区宽度：1920

// 引入外部html文件
function include(element, filePath) {
    console.log("include");
    let req = new XMLHttpRequest();
    req.open("get", filePath);
    req.send(null);
    req.onload = function () {
        if (req.status === 200) {
            element.innerHTML = req.responseText;
        }
    };
}

include($("#html5")[0], "list-1.html");
// include($("#css3")[0], "list-2.html");
// include($("#java-script")[0], "list-3.html");
// include($("#java")[0], "list-4.html");