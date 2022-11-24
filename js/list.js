// JavaScript Document

//商品规格选择
$(function () {
	$(".theme-options").each(function () {
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

})


//弹出规格选择
$(document).ready(function () {
	var $ww = $(window).width();
	if ($ww < 1025) {
		$('.theme-login').click(function () {
			$(document.body).css("position", "fixed");
			$('.theme-popover-mask').show();
			$('.theme-popover').slideDown(200);

		})

		$('.theme-poptit .close,.btn-op .close').click(function () {
			$(document.body).css("position", "static");
			//					滚动条复位
			$('.theme-signin-left').scrollTop(0);

			$('.theme-popover-mask').hide();
			$('.theme-popover').slideUp(200);
		})

	}
})

//导航固定
$(document).ready(function () {
	var $ww = $(window).width();
	var dv = $('ul.am-tabs-nav.am-nav.am-nav-tabs'),
		st;

	if ($ww < 623) {

		var tp = $ww + 363;
		$(window).scroll(function () {
			st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
			if (st >= tp) {
				if (dv.css('position') != 'fixed') dv.css({
					'position': 'fixed',
					top: 53,
					'z-index': 1000009
				});

			} else if (dv.css('position') != 'static') dv.css({
				'position': 'static'
			});
		});
		//滚动条复位（需要减去固定导航的高度）

		$('.introduceMain ul li').click(function () {
			sts = tp;
			$(document).scrollTop(sts);
		});
	} else {

		dv.attr('otop', dv.offset().top); //存储原来的距离顶部的距离
		var tp = parseInt(dv.attr('otop')) + 36;
		$(window).scroll(function () {
			st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
			if (st >= tp) {

				if (dv.css('position') != 'fixed') dv.css({
					'position': 'fixed',
					top: 0,
					'z-index': 998
				});

				//滚动条复位	
				$('.introduceMain ul li').click(function () {
					sts = tp - 35;
					$(document).scrollTop(sts);
				});

			} else if (dv.css('position') != 'static') dv.css({
				'position': 'static'
			});
		});



	}
});


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
			while (localStorage.length > 1) {
				vv.href = "registe.html"
			}
		}
		carbtn.onclick = function () {
			window.location.href = "shopcart.html"
		}
	}
	if (localStorage.length <= 1) {
		carbtn.onclick = function () {
			alert("您还未登录账号")
		}
	}
	Ajax("get", "../data/goods.json", "", function (res) {
		var r = JSON.parse(res);
		var mc = document.getElementsByClassName("mc")[0];
		var mstr = ''
		for (var i = 3; i < 7; i++) {
			mstr += `<li class="first">
			<div class="p-img">
				<a href="detail.html?detail=${r[i].detail}"> <img class="" src="${r[i].imgurl}"> </a>
			</div>
			<div class="p-name"><a href="#">
			${r[i].name}
				</a>
			</div>
			<div class="p-price"><strong>￥${r[i].price}</strong></div>
		</li>`
		}
		mc.innerHTML = `<ul>
		<div class="mt">
			<h2>看了又看</h2>
		</div>
		${mstr}
		</ul>`
	})

	var detailid = decodeURI(window.location.href.split("?")[1].split("=")[1]);
	var imgurlbuy = ""
	if (detailid.indexOf(3) == 0) {
		getdetail(2);
		imgurlbuy = "../imgs/doggood3.jpg"
	} else if (detailid.indexOf(1) == 0) {
		getdetail(0);
		imgurlbuy = "../imgs/doggood1.jpg"
	} else if (detailid.indexOf(2) == 0) {
		getdetail(1);
		imgurlbuy = "../imgs/doggood2.jpg"
	} else {
		getdetail(2);
		imgurlbuy = "../imgs/doggood3.jpg"
	}

	// 封装获取函数
	function getdetail(s) {
		Ajax("get", "../data/detail.json", "", function (res) {
			var r = JSON.parse(res);
			console.log(r, detailid);
			// 设置第一张图
			var fimg = document.getElementsByClassName("jqzoom")[0]
			fimg.src = r[s].imgurl.bigurl[0]
			fimg.setAttribute("rel", r[s].imgurl.bigurl[0])
			// 设置大图和小图
			var dimgs = document.getElementsByClassName("dimg");
			for (var i = 0; i < dimgs.length; i++) {
				dimgs[i].setAttribute("src", r[s].imgurl.smallurl[i])
				dimgs[i].setAttribute("mid", r[s].imgurl.bigurl[i])
				dimgs[i].setAttribute("big", r[s].imgurl.bigurl[i])
			}
			// 设置名字
			var nameh1 = document.getElementById("nameh1");
			nameh1.innerHTML = r[s].name;
			// 设置价格
			var price = document.getElementsByClassName("sys_item_price")[0];
			price.innerHTML = r[s].price;
			// 设置规格
			var spec = document.getElementById("spec");
			spec.innerHTML = r[s].spec
			// 添加参数
			var J_AttrUL = document.getElementById("J_AttrUL");
			var str = '';
			for (var i = 0; i < r[s].para.length; i++) {
				str += `
				<li title="">${r[s].para[i]}</li>
				`
			}
			J_AttrUL.innerHTML = str;
			// 设置详情图片
			var twlistNews = document.getElementsByClassName("twlistNews")[0];
			var imgstr = '';
			for (var i = 0; i < r[s].imgurl.detailurl.length; i++) {
				imgstr += `
				<img src=${r[s].imgurl.detailurl[i]} />
				`
			}
			twlistNews.innerHTML = imgstr
		})
	}

	// 商品数量
	var min = document.getElementById("min");
	var add = document.getElementById("add");
	var text_box = document.getElementById("text_box");
	min.onclick = function () {
		text_box.value = Number(text_box.value) - 1;
		if (Number(text_box.value) <= 1) {
			text_box.value = 1;
		}
	}
	add.onclick = function () {
		text_box.value = Number(text_box.value) + 1;
		if (Number(text_box.value) >= 10) {
			text_box.value = 10;
		}
	}
	// 立即购买
	var LikBuy = document.getElementById("LikBuy");


	LikBuy.onclick = function () {
		if (localStorage.length <= 1) {
			alert("请先登录账号")
		} else {
			// 取商品名字，数量，价格，规格,商品图片
			var nameh1 = document.getElementById("nameh1");
			var price = document.getElementsByClassName("sys_item_price")[0];
			var spec = document.getElementById("spec");
			var text_box = document.getElementById("text_box");
			var objdata = {
				"name": nameh1.innerHTML,
				"price": price.innerHTML,
				"spec": spec.innerHTML,
				"count": text_box.value,
				"imgbuy": imgurlbuy
			}
			console.log(objdata);
			window.location.href = "pay.html?objdata=" + JSON.stringify(objdata);
		}
	}
	// 加入购物车
	var LikBasket = document.getElementById("LikBasket");
	LikBasket.onclick = function () {
		if (localStorage.length <= 1) {
			alert("请先登录账号")
		} else {
			window.location.href = ("shopcart.html")
		}

	}



}