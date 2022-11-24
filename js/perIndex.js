window.onload = function () {
    // 获取名字等信息
    console.log(localStorage);
    var sname = document.getElementsByClassName("s-name")[0]
    sname.innerHTML = localStorage.nickname


    console.log($(".s-date").children()[0]);
    var date = new Date();
    var week = ''
    switch (date.getDay()) {
        case 0:
            week = "星期一";
            break;
        case 2:
            week = "星期二";
            break;
        case 3:
            week = "星期三";
            break;
        case 4:
            week = "星期四";
            break;
        case 5:
            week = "星期五";
            break;
        case 6:
            week = "星期六";
            break;
        case 1:
            week = "星期日";
            break;
    }
    $(".s-date").children()[0].innerHTML = date.getDate()
    $(".s-date").children()[1].innerHTML = week

    $(".s-date").children()[2].innerHTML = date.getFullYear() + '.' + (date.getMonth() + 1)

}