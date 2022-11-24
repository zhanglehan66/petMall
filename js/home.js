window.onload = function () {
    var h = document.getElementsByClassName("h")[0]
    var vv = document.getElementsByClassName("vv")[0]
    var carbtn = document.getElementById("carbtn");
    if (localStorage.length > 1) {
        h.innerHTML = "你好" + `<span style="color:#f60">${localStorage.nickname}</span>`;
        h.href = "../person/index.html"
        vv.href = "#"
        vv.innerHTML = "退出登录"
        vv.onclick = function () {
            localStorage.clear();
            h.innerHTML = "亲，请登录";
            h.href = "login.html"
            vv.innerHTML = "免费注册"
            while(localStorage.length>1){
                vv.href = "registe.html"
            }
        }
        carbtn.onclick=function(){
            window.location.href="shopcart.html"
        }
    }
    if(localStorage.length<=1){
        carbtn.onclick = function(){
            alert("您还未登录账号")
        }
    }

    Ajax("get", "../data/classify.json", '', function (res) {
        var r = JSON.parse(res)

        var catelist = document.getElementById("js_climit_li");
        console.log(catelist, r);
        var ulis = '';
        var dlis = '';
        var hlis = '';
        for (let i = 0; i < r.length; i++) {
            for (let j = 0; j < r[i].xilie.length; j++) {
                dlis += `<dd><a href="./search.html?class=${r[i].xilie[j].name}"><span>${r[i].xilie[j].name}</span></a></dd>`
            }
            for (let m = 0; m < r[i].hotbrand.length; m++) {
                hlis += `<dd>
                <a target="_blank" href="./search.html?class=${r[i].hotbrand[m].name}" rel="nofollow">
                <span class="red">${r[i].hotbrand[m].name}</span></a>
                </dd>`
            }
            ulis += `<li class="appliance js_toggle relative first">
            <div class="category-info">
                <h3 class="category-name b-category-name"><a class="ml-22"
                        title="${r[i].classnm}">${r[i].classnm}</a>
                </h3>
                <em>&gt;</em>
            </div>
            <div class="menu-item menu-in top">
                <div class="area-in">
                    <div class="area-bg">
                        <div class="menu-srot">
                            <div class="sort-side">
                                <dl class="dl-sort">
                                    <dt><span>${r[i].classnm}系列分类</span></dt>
                                    ${dlis}
                                </dl>
                            </div>
                            <div class="brand-side">
                                <dl class="dl-sort">
                                    <dt><span>实力商家</span></dt>
                                    ${hlis}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b class="arrow"></b>
        </li>`
            dlis = '';
            hlis = '';
        }
        catelist.innerHTML = ulis;
        $(document).ready(function () {
            $("li").hover(function () {
                $(".category-content .category-list li.first .menu-in").css("display", "none");
                $(".category-content .category-list li.first").removeClass("hover");
                $(this).addClass("hover");
                $(this).children("div.menu-in").css("display", "block")
            }, function () {
                $(this).removeClass("hover")
                $(this).children("div.menu-in").css("display", "none")
            });
        })
    })

    var per = document.getElementById("personzx");
    per.onclick = function () {
        if (localStorage.length > 1) {
            window.location = ("../person/index.html")
        } else {
            alert("您还未登录")
            window.location = ("./login.html")
        }
    }


    var f1 = document.getElementById("f1");
    var f2 = document.getElementById("f2");
    var f3 = document.getElementById("f3");
    var f4 = document.getElementById("f4");
    var f5 = document.getElementById("f5");
    Ajax("get", "../data/classify.json", '', function (res) {
        var r = JSON.parse(res);
        // 宠物狗用品
       
        var t1 = f1.getElementsByClassName("today-brands")[0];
        var t2 = f2.getElementsByClassName("today-brands")[0];
        var t3 = f3.getElementsByClassName("today-brands")[0];
        var t4 = f4.getElementsByClassName("today-brands")[0];
        var t5 = f5.getElementsByClassName("today-brands")[0];
        var t6 = f6.getElementsByClassName("today-brands")[0];
        var t1cont = '';
        var t2cont = '';
        var t3cont = '';
        var t4cont = '';
        var t5cont = '';
        var t6cont = '';
        for (var i = 0; i < 5; i++) {
            t1cont += `<a href="search.html?class=${r[0].xilie[i].name}">${r[0].xilie[i].name}</a>`
            t2cont += `<a href="search.html?class=${r[1].xilie[i].name}">${r[1].xilie[i].name}</a>`
            t3cont += `<a href="search.html?class=${r[2].xilie[i].name}">${r[2].xilie[i].name}</a>`
            t4cont += `<a href="search.html?class=${r[3].xilie[i].name}">${r[3].xilie[i].name}</a>`
            t5cont += `<a href="search.html?class=${r[4].xilie[i].name}">${r[4].xilie[i].name}</a>`
            t6cont += `<a href="search.html?class=${r[5].xilie[i].name}">${r[5].xilie[i].name}</a>`
        }

        t1.innerHTML = t1cont;
        t2.innerHTML = t2cont;
        t3.innerHTML = t3cont;
        t4.innerHTML = t4cont;
        t5.innerHTML = t5cont;
        t6.innerHTML = t6cont;

    })

//     var goodlist1 = f1.getElementsByClassName("am-g")[0]
//     var flag=false;
//     Ajax("get", "../data/goods.json", '', function (res) {
//         var r = JSON.parse(res);
//         var divs = ''
//         console.log(r[0].dog[0].name);
//         for(let i=0;i<r[0].dog.length;i++){
//             divs+=`<div class="am-u-sm-7 am-u-md-4 text-two sug">
//             <div class="outer-con ">
//                 <div class="title ">
//                     ${r[0].dog[i].name}
//                 </div>
//                 <div class="sub-title ">
//                     ¥${r[0].dog[i].price}
//                 </div>
//                 <i class="am-icon-shopping-basket am-icon-md  seprate"></i>
//             </div>
//             <a href="# "><img src="${r[0].dog[i].imgurl}" /></a>
//         </div>`
//         }
//         console.log(divs);
//         goodlist1.innerHTML+=divs
//         flag=true;
//     })

//     loadFile = setInterval(function() {//定时检测    
//         if(flag) {//如果数据已经处理完毕
//             loadjscssfile('../css/hmstyle.css', "css"); //加载你的css文件
//             loadjscssfile('../basic/css/demo.css', "css"); //加载你的css文件
//             loadjscssfile('https://cdn.bootcss.com/amazeui/2.5.1/css/amazeui.css', "css"); //加载你的css文件
//             loadjscssfile('../AmazeUI-2.4.2/assets/css/admin.css', "css"); //加载你的css文件
//             loadjscssfile('../js/home.js', "js"); //加载你的js文件
//             loadjscssfile('../js/tools.js', "js"); //加载你的js文件
//             loadjscssfile('../js/template-web.js', "js"); //加载你的js文件
//             clearTimeout(loadFile);//取消定时检测节省开销
//         }
//     },5000);
// //动态加载 js /css 
// function loadjscssfile(filename, filetype) {
//     if (filetype == "js") { //判定文件类型
//         var fileref = document.createElement('script')//创建标签
//         fileref.setAttribute("type", "text/javascript")//定义属性type的值为text/javascript
//         fileref.setAttribute("src", filename)//文件的地址
//     }
//     else if (filetype == "css") { //判定文件类型
//         var fileref = document.createElement("link")
//         fileref.setAttribute("rel", "stylesheet")
//         fileref.setAttribute("type", "text/css")
//         fileref.setAttribute("href", filename)
//     }
//     if (typeof fileref != "undefined")
//         document.getElementsByTagName("head")[0].appendChild(fileref)
// }

// 点击全部分类进入列表页
$(".long-title").on("click",function(){
    sessionStorage.setItem('biaozhi','1');
    window.location.href="search.html"
})
// 点击某个分类进入列表页
// 搜索
$("#ai-topsearch").on("click",function(){
    var searchinp = document.getElementById("searchInput");
    var a = searchinp.value;
    console.log(a);
    window.location.href="search.html?class="+a;

})

}