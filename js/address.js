// 请求地址

window.onload = function () {


	var addressul = document.getElementById("addressul");
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
			console.log(res.list, addressul);
			// 将地址循环进页面
			var str = ``;
			for (let i = 0; i < res.list.length; i++) {

				str += `<li class="user-addresslist" index="${res.list[i].id}">
				<span class="new-option-r"><i class="am-icon-check-circle"></i>选择地址</span>
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
			addressul.innerHTML = str;
			// 选择默认地址
			$(".user-addresslist").click(function () {
				$(this).addClass("defaultAddr").siblings().removeClass("defaultAddr");
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

			//删除地址
			$(".del").click(function () {
				console.log($($($($(this).parents()[1]).children()[2]).children()[0]).children()[1].innerText);
				var delobj = {
					"uaddressid": localStorage.addressid,
					"address": $($($($(this).parents()[1]).children()[2]).children()[0]).children()[4].innerText
				}
				console.log(delobj);
				$.ajax({
					//请求方式
					type: "POST",
					//请求的媒体类型
					contentType: "application/json;charset=UTF-8",
					//请求地址
					url: "http://192.168.31.132:8888/User/deleteAddress",
					//数据，json字符串
					data: JSON.stringify(delobj),
					//请求成功
					success: function (result) {
						console.log(result);
						location.reload()
					}
				})
			})

			// 修改地址
			$(".update").click(function () {
				$(".add-dress").css("display", "none");
				$(".update-dress").css("display", "block");
				// 将信息填入空格
				var firstname = $($($(this).parents()[1]).children()[1]).children()[0].innerText;
				var firstphone = $($($(this).parents()[1]).children()[1]).children()[1].innerText;
				var firstintro = $($($($(this).parents()[1]).children()[2]).children()[0]).children()[4].innerText;
				var thisid = $(this).parents()[1].getAttribute("index");
				console.log(thisid,firstname, firstphone, firstintro);
				$("#upname")[0].value = firstname;
				$("#upphone")[0].value = firstphone;
				$("#upintro")[0].value = firstintro;
				$("#upbtn").click(function () {
					var newname = $("#upname")[0].value;
					var newphone = $("#upphone")[0].value;
					var newintro = $("#upintro")[0].value;
					
					if (firstname == newname && firstphone == newphone && firstintro == newintro) {
						// 如果没有修改就清空
						$("#upname")[0].value = '';
						$("#upphone")[0].value = '';
						$("#upintro")[0].value = '';
					} else {
						// 如果有修改过，就将数据传过去
						var updateobj = {
							"rsvname":newname,
							"rsvphone":newphone,
							"province": $("#updistpick").children()[0].value,
							"city": $("#updistpick").children()[1].value,
							"district": $("#updistpick").children()[2].value,
							"address": newintro,
							"uaddressid": localStorage.addressid,
							"id":thisid
						}
						console.log(updateobj);
						$.ajax({
							//请求方式
							type: "POST",
							//请求的媒体类型
							contentType: "application/json;charset=UTF-8",
							//请求地址
							url: "http://192.168.31.132:8888/User/updateAddress",
							//数据，json字符串
							data: JSON.stringify(updateobj),
							//请求成功
							success: function (result) {
								var res = JSON.parse(result);
								console.log(res);
								alert(res.info);
								location.reload();
							}
						})
					}

				})
			})
		},

		//请求失败，包含具体的错误信息
		error: function (e) {
			console.log(e.info);
		}
	})


	// 添加地址
	$("#addbtn").click(function () {
		if ($("#user-name")[0].value == '' || $("#user-phone")[0].value == '') {
			alert("请将收货信息填写完整")
		} else {
			var addobj = {
				"rsvname": $("#user-name")[0].value,
				"rsvphone": $("#user-phone")[0].value,
				"province": $("#distpick").children()[0].value,
				"city": $("#distpick").children()[1].value,
				"district": $("#distpick").children()[2].value,
				"address": $("#user-intro")[0].value,
				"uaddressid": localStorage.addressid
			}
			console.log(addobj);
			$.ajax({
				//请求方式
				type: "POST",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				//请求地址
				url: "http://192.168.31.132:8888/User/insertAddress",
				//数据，json字符串
				data: JSON.stringify(addobj),
				//请求成功
				success: function (result) {
					console.log(result);
					location.reload();
				},
				//请求失败，包含具体的错误信息
				error: function (e) {
					console.log(e.info);
				}
			})
		}
	})



}

$(function () {
	$(".add").click(function () {
		var t = $(this).parent().find('input[class*=text_box]');
		t.val(parseInt(t.val()) + 1)
	})
	$(".min").click(function () {
		var t = $(this).parent().find('input[class*=text_box]');
		t.val(parseInt(t.val()) - 1)
		if (parseInt(t.val()) < 0) {
			t.val(0);
		}
	})
})


// <!--兼容IE浏览器 -->
if (!document.getElementsByClassName) {
	document.getElementsByClassName = function (cls) {
		var ret = [];
		var els = document.getElementsByTagName('*');
		for (var i = 0, len = els.length; i < len; i++) {

			if (els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
				ret.push(els[i]);
			}
		}
		return ret;
	}
}



// 弹出地址选择

$(document).ready(function ($) {

	var $ww = $(window).width();

	$('.theme-login').click(function () {
		//	禁止遮罩层下面的内容滚动
		$(document.body).css("overflow", "hidden");

		$(this).addClass("selected");
		$(this).parent().addClass("selected");


		$('.theme-popover-mask').show();
		$('.theme-popover-mask').height($(window).height());
		$('.theme-popover').slideDown(200);

	})

	$('.theme-poptit .close,.btn-op .close').click(function () {

		$(document.body).css("overflow", "visible");
		$('.theme-login').removeClass("selected");
		$('.item-props-can').removeClass("selected");
		$('.theme-popover-mask').hide();
		$('.theme-popover').slideUp(200);
	})


});