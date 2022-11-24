window.onload=function(){
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
    var mo = document.getElementById("mo")
    var userifo = document.getElementsByClassName("user-info")[0];
    var ps = userifo.getElementsByTagName("p");
    mo.innerHTML="¥"+sessionStorage.getItem("allprice")
    ps[0].innerHTML = "收货人："+sessionStorage.getItem("receiver")
    ps[1].innerHTML = "联系电话："+sessionStorage.getItem("phonenumber")
    ps[2].innerHTML = "收货地址："+sessionStorage.getItem("ads")
    var btn = document.getElementsByTagName("button")[0];
    btn.onclick=function(){
        window.location.href=("home.html")
    }
}