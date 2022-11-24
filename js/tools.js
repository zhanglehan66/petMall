// js的函数库

// 获取元素的非行间样式
function getStyle(ele, attr) {
    // ele: 元素
    // attr: 属性名
    if (window.getComputedStyle) {
        // 标准
        // console.log(window.getComputedStyle(ele)[attr]);
        return window.getComputedStyle(ele)[attr];
    } else {
        // ie8及以下
        // console.log(ele.currentStyle[attr]);
        return ele.currentStyle[attr];
    }
}

// 运动函数
function move(ele, attr, step, tar) {
    // ele: 元素
    // attr: 属性
    // step: 每一步距离  0-1000 +10   1000-0 -10
    // tar: 目标值
    // 为了用户的方便，每一步是加还是减，需要函数内来进行判断
    var cur = parseInt(getStyle(ele, attr));
    step = cur < tar ? step : -step;
    // 开启新的定时器之前，先清除定时器
    clearInterval(ele.t);
    // 要想不间断移动，开启定时器
    ele.t = setInterval(function () {
        // 每一次都基于当前的left减少10px
        var cur = parseInt(getStyle(ele, attr));
        var end = cur + step;
        // 判断是否到达目标值
        if (step > 0 && end >= tar || step < 0 && end <= tar) {
            end = tar;
            clearInterval(ele.t);
        }
        // 将计算以后的结束值，赋值给ele的left
        ele.style[attr] = end + 'px';
    }, 20);
}

// 获取随机验证码
function getCode(n, str) {
    str = str ? str : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    n = n ? n : 4;
    // 存储获取到字母
    var s = '';
    // 随机6位验证码
    // 得到6次随机数
    for (var i = 0; i < n; i++) {
        var num = Math.floor(Math.random() * str.length);
        s += str[num];
    }
    // 设置返回值
    return s;
}

// 给10以下数字 补0操作
function add0(val) {
    if (val < 10) {
        val = '0' + val;
    } else {
        val = val;
    }
    return val;
}

// 有目的性的函数: 创建一个标签
function createEle(ele, text) {
    // ele: 创建什么节点
    // text: td中的内容传递过来
    var td4 = document.createElement(ele);
    td4.innerHTML = text;
    return td4;
}

// 添加事件绑定
function addEvent(ele, type, fn) {
    // ele: 元素
    // type: 事件类型
    if (ele.attachEvent) {
        // ie8
        ele.attachEvent('on' + type, fn);
    } else {
        // 标准
        ele.addEventListener(type, fn, false);
    }
}


// 事件取消
function removeEvent(ele, type, fn) {
    // ele: 元素
    // type: 事件类型
    // fn: 函数
    if (ele.detachEvent) {
        // ie8
        ele.detachEvent('on' + type, fn);
    } else {
        // 标准
        ele.removeEventListener(type, fn, false);
    }
}

// 空函数：拖拽
function drag(elem) {
    // elem: 元素
    // 添加按下事件
    elem.onmousedown = function (evs) {
        // 按下的瞬间，获取鼠标当前的位置 事件对象
        var ev = window.event || evs;
        // l1 = x1 - ol;   l1: 鼠标距离元素左侧的距离   x1: 鼠标距离屏幕左侧的距离  ev.clientX
        var l1 = ev.clientX - elem.offsetLeft;
        var t1 = ev.clientY - elem.offsetTop;
        document.onmousemove = function (evs) {
            // 元素动一下  left移动10px
            // elem.style.left = 50 + 'px';
            // 鼠标移动的位置 事件对象
            var ev = window.event || evs;
            // 设置给元素的l  l = cx - l1;   cx: 鼠标距离屏幕左侧的距离  - 鼠标距离元素左侧的距离
            var le = ev.clientX - l1;
            var to = ev.clientY - t1;
            // 判断临界值
            if (le <= 0) {
                le = 0;
            }
            if (to <= 0) {
                to = 0;
            }
            var lMax = document.documentElement.clientWidth - elem.offsetWidth;
            if (le >= lMax) {
                le = lMax;
            }
            var tMax = document.documentElement.clientHeight - elem.offsetHeight;
            if (to >= tMax) {
                to = tMax;
            }

            // 赋值给elem
            elem.style.left = le + 'px';
            elem.style.top = to + 'px';
        }
        // elem设置全局捕获
        if (elem.setCapture) {
            elem.setCapture();
        }
        return false;
    }
    // 添加抬起事件
    document.onmouseup = function () {
        document.onmousemove = null;
        // 释放全局捕获
        if (elem.releaseCapture) {
            elem.releaseCapture();
        }
    }
}

// 缓冲运动 
function buffMove(ele, object, fn) {
    // ele: 元素
    // object: 属性和目标值
    // fn: 回调函数
    // 获取每一个属性判断有没有透明度
    for (var key in object) {
        if (key == 'opacity') {
            object[key] = object[key] * 100
        }
    }
    // 清除定时器，保证一次只有一个定时器在动
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        // 不知道要不要清除定时器  假设需要清除
        var flag = true;
        for (var key in object) {
            if (key == 'opacity') {
                // 当前透明度  0-1  0-100
                var cur = getStyle(ele, key) * 100;
            } else {
                // 每一次从当前位置  获取当前位置 981.95 用parseInt-->981
                var cur = parseInt(getStyle(ele, key));
            }
            // 速度 路程/时间
            var speed = (object[key] - cur) / 20;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            var end = cur + speed;
            // 判断有没有到达目标值 如果没有到目标值，一个没到，都不能清除
            if (end != object[key]) {
                // 没到
                flag = false;
            }
            if (key == 'opacity') {
                ele.style[key] = end / 100;
            } else {
                // 赋值给ele
                ele.style[key] = end + 'px';
            }
        }
        // flag为true  假设成立  需要清除  动作已经结束
        if (flag) {
            clearInterval(ele.timer);
            fn && fn();
        }
    }, 20);
}

// 请求数据的ajax函数
function Ajax(type, url, string, fn) {
    // type: 请求方式
    // url: 请求地址
    // string: 请求参数
    // fn: 请求完成后要执行的函数
    // 1. 创建ajax对象
    var ajax = new XMLHttpRequest();
    // 建立连接: ajax对象.open(请求方式, 请求地址 + ? + 请求参数, 是否异步);
    if (type == 'get') {
        ajax.open(type, url + '?' + string, true);
        // 3. 发送请求: ajax对象.send();
        ajax.send();
    } else {
        ajax.open(type, url, true);
        // 2.1 设置头请求
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
        // 3. 发送请求: ajax对象.send();
        ajax.send(string);
    }

    // 4. 添加事件监听: ajax对象.onreadystatechange事件
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // 5. 得到请求返回的数据  ajax对象.response
            fn(ajax.response);
        }
    }
}


// 面向对象的选项卡
function ChangeDiv(parent) {
    // 获取元素
    var par = document.getElementById(parent);
    this.divs = par.getElementsByTagName('div');
    this.btns = par.getElementsByTagName('button');
    // 外头能得到正确的this 存一下
    var that = this;
    // 点击每一个btn 
    for (var i = 0; i < this.btns.length; i++) {
        this.btns[i].index = i;
        // this.btns[i].onclick = this.cFn;
        this.btns[i].onclick = function () {
            // 点击事件中 this指向触发源 this.btns[i]
            that.cFn(this.index);
        };
    }
}
ChangeDiv.prototype.cFn = function (ind) {
    // 显示div  下标一一对应  按钮的下标
    // 当前点击事件中得不到正确的对象的this
    for (var j = 0; j < this.divs.length; j++) {
        this.divs[j].style.display = 'none';
    }
    this.divs[ind].style.display = 'block';
}


/* 获取当前时间  格式：2020.11.12 11:33 */
function getNowTime() {
    // 获取时间对象
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    mm = add0(mm);
    hh = add0(hh);
    d = add0(d);
    m = add0(m);
    var time = y + '.' + m + '.' + d + '  '  + hh + ':' + mm ;

    return time;
}

