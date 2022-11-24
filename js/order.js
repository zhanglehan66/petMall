window.onload = function () {
   
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url: "http://192.168.31.132:8888/User/getOrder",
        //数据，json字符串
        data: "",
        //请求成功
        success: function (result) {
            console.log(result);
            var r = JSON.parse(result);
            console.log(r);
            var str = ''
            var orderlist = document.getElementsByClassName("order-list")[0]
            for (let i = 0; i < r.orderlist.length; i++) {
                str += `<div class="order-status5">
                <div class="order-title">
                    <div class="dd-num">订单编号：<a href="javascript:;">${r.orderlist[i].id}</a></div>
                </div>
                <div class="order-content">
                    <div class="order-left">
                        <ul class="item-list">
                            <li class="td td-item">
                                <div class="item-pic">
                                    <a class="J_MakePoint">
                                        <img src="${r.orderlist[i].imgurl}"
                                            class="itempic J_ItemImg" style="width:80px;height:80px">
                                    </a>
                                </div>
                                <div class="item-info">
                                    <div class="item-basic-info">
                                        <a>
                                            <p>${r.orderlist[i].name}</p>
                                            <p class="info-little">${r.orderlist[i].spec}
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="td td-price">
                                <div class="item-price">
                                ${r.orderlist[i].price}
                                </div>
                            </li>
                            <li class="td td-number">
                                <div class="item-number">
                                    <span>×</span>${r.orderlist[i].count}
                                </div>
                            </li>
                            <li class="td td-operation">
                                <div class="item-operation">

                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="order-right">
                        <li class="td td-amount">
                            <div class="item-amount">
                                合计：${r.orderlist[i].allprice}
                                <p>含运费：<span>10.00</span></p>
                            </div>
                        </li>
                        <div class="move-right">
                            <li class="td td-status">
                                <div class="item-status">
                                    <p class="Mystatus">交易成功</p>
                                    
                                </div>
                            </li>
                            <li class="td td-change">
                                <div id="delorder" index=${r.orderlist[i].id} class="am-btn am-btn-danger anniu">
                                    删除订单</div>
                            </li>
                        </div>
                    </div>
                </div>
            </div>`
            }
            orderlist.innerHTML = str;

            // 删除
            var delorder = document.getElementById("delorder");
            delorder.onclick = function () {
                var orderid = {
                    "id": Number(this.attributes.index.value)
                }
                console.log(orderid);
                $.ajax({
                    //请求方式
                    type: "POST",
                    //请求的媒体类型
                    contentType: "application/json;charset=UTF-8",
                    //请求地址
                    url: "http://192.168.31.132:8888/User/deleteOrder",
                    //数据，json字符串
                    data: JSON.stringify(orderid),
                    //请求成功
                    success: function (result) {
                        console.log(result);
                        location.reload()
                    }
                })
            }
        }
    })
}