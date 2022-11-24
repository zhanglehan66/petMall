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
    // 商品数量
	var min = document.getElementById("min");
	var add = document.getElementById("add");
	var text_box = document.getElementById("text_box");
	min.onclick=function(){
		text_box.value=Number(text_box.value) - 1;
		if(Number(text_box.value)<=1){
			text_box.value=1;
		}
	}
	add.onclick=function(){
		text_box.value=Number(text_box.value) + 1;
		if(Number(text_box.value)>=10){
			text_box.value=10;
		}
	}
}