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

// 音乐样式
let playPauseElement = $(".march-play-pause");
let music2Element = $(".march-music-2")[0];
let musicContentElement = $(".march-music-content");
let musicUlElement = musicContentElement.children()[0];
let audio = $("#march-audio")[0];
let data;
let position = 0;

// 鼠标进
musicContentElement.mouseover(function () {
    addClass(music2Element, "march-music-2-hover");
});
// 鼠标出
musicContentElement.mouseout(function () {
    removeClass(music2Element, "march-music-2-hover");
});

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