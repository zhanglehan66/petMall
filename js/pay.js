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

        //获取url带过来的参数,如下代码是获取url问号后面的字符串
        var query = decodeURI(window.location.href.split("?")[1].split("=")[1]);
        query = JSON.parse(query)
        console.log(query);

        var payphone = document.getElementsByClassName("pay-phone")[0];
        payphone.innerHTML = `<li class="td td-item">
    <div class="item-pic">
        <a href="#" class="J_MakePoint">
            <img src="${query.imgbuy}"
                class="itempic J_ItemImg"  style="width: 80px;
                height: 80px;"></a>
    </div>
    <div class="item-info">
        <div class="item-basic-info">
            <a href="#" class="item-title J_MakePoint"
                data-point="tbcart.8.11">${query.name}</a>
        </div>
    </div>
    </li>
    <li class="td td-info">
        <div class="item-props">
            <span class="sku-line">${query.spec}</span>
        </div>
    </li>
    <li class="td td-price">
        <div class="item-price price-promo-promo">
            <div class="price-content">
                <em class="J_Price price-now">${query.price}</em>
            </div>
        </div>
    </li>
    `
        var money = document.getElementById("money");
        var J_ActualFee = document.getElementById("J_ActualFee");
        var paysum = document.getElementById("paysum");
        money.innerHTML = Number(query.price) * Number(query.count)
        J_ActualFee.innerHTML = Number(query.price) * Number(query.count)
        paysum.innerHTML = Number(query.price) * Number(query.count) + 10
        // 商品数量
        var min = document.getElementById("min");
        var add = document.getElementById("add");
        var text_box = document.getElementById("text_box");
        text_box.value = query.count
        min.onclick = function () {
            text_box.value = Number(text_box.value) - 1;
            if (Number(text_box.value) <= 1) {
                text_box.value = 1;
            }
            var money = document.getElementById("money");
            money.innerHTML = Number(query.price) * Number(text_box.value)
            J_ActualFee.innerHTML = Number(query.price) * Number(text_box.value)
            paysum.innerHTML = Number(query.price) * Number(text_box.value) + 10
        }
        add.onclick = function () {
            text_box.value = Number(text_box.value) + 1;
            if (Number(text_box.value) >= 10) {
                text_box.value = 10;
            }
            money.innerHTML = Number(query.price) * Number(text_box.value)
            J_ActualFee.innerHTML = Number(query.price) * Number(text_box.value)
            paysum.innerHTML = Number(query.price) * Number(text_box.value) + 10
        }

        var addressidobj = {
            "uaddressid": localStorage.addressid
        }
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://192.168.31.132:8888/User/getAddress",
            //数据，json字符串
            data: JSON.stringify(addressidobj),
            //请求成功
            success: function (result) {
                var res = JSON.parse(result)
                // 将地址循环进页面
                var str = ``;
                var adressul = document.getElementById("adressul");
                for (let i = 0; i < res.list.length; i++) {

                    str += `<li class="user-addresslist" index="${res.list[i].id}">
				<span class="new-option-r"></span>
				<p class="new-tit new-p-re">
					<span class="new-txt">${res.list[i].rsvname}</span>
					<span class="new-txt-rd2">${res.list[i].rsvphone}</span>
				</p>
				<div class="new-mu_l2a new-p-re">
					<p class="new-mu_l2cw">
					<span class="title">地址：</span>
					<span class="title">${res.list[i].province}</span>
					<span class="title">${res.list[i].city}</span>
					<span class="title">${res.list[i].district}</span>
					<span class="title">${res.list[i].address}</span>
					</p>
				</div>
				<div class="new-addr-btn">
					<a href="#" class="update"><i class="am-icon-edit"></i>编辑</a>
					<span class="new-addr-bar">|</span>
					<a href="javascript:void(0);" class="del"><i class="am-icon-trash"></i>删除</a>
				</div>
			</li>`
                }
                adressul.innerHTML = str
                $(".user-addresslist").click(function () {
                    $(this).addClass("defaultAddr").siblings().removeClass("defaultAddr");
                    $(this)[0].children[1].children[0].innerHTML;
                   
                    sessionStorage.setItem("receiver",$(this)[0].children[1].children[0].innerHTML)
                    sessionStorage.setItem("phonenumber",$(this)[0].children[1].children[1].innerHTML)
                    sessionStorage.setItem("ads", $(this)[0].children[2].children[0].children[1].innerHTML+
                    $(this)[0].children[2].children[0].children[2].innerHTML+
                    $(this)[0].children[2].children[0].children[3].innerHTML+
                    $(this)[0].children[2].children[0].children[4].innerHTML);
                });
                $(".logistics").each(function () {
                    var i = $(this);
                    var p = i.find("ul>li");
                    p.click(function () {
                        if (!!$(this).hasClass("selected")) {
                            $(this).removeClass("selected");
                        } else {
                            $(this).addClass("selected").siblings("li").removeClass("selected");
                        }
                    })
                })
            }
        })

        var jgo = document.getElementById("J_Go");
        jgo.onclick = function () {
            var pay={
                "imgurl":query.imgbuy,
                "name":query.name,
                "allprice":paysum.innerHTML,
                "count":text_box.value,
                "spec":query.spec,
                "price":query.price
            }
            $.ajax({
                    //请求方式
                    type: "POST",
                    //请求的媒体类型
                    contentType: "application/json;charset=UTF-8",
                    //请求地址
                    url: "http://192.168.31.132:8888/User/insertOrder",
                    //数据，json字符串
                    data: JSON.stringify(pay),
                    //请求成功
                    success: function (result) {
                        console.log(result);
                    }
            })
            sessionStorage.setItem("allprice",paysum.innerHTML);

            this.href="success.html"

        }
    }