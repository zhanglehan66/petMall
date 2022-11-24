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
            vv.innerHTML = "免费注册";
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
    // 将分类数据渲染页面
    Ajax("get", "../data/classify.json", '', function (res) {
        var r = JSON.parse(res);
        console.log(r);
        var dl1 = document.getElementById("select1");
        var dl2 = document.getElementById("select2");
        var dl3 = document.getElementById("select3");

        var dstr1 = ''
        var dd1 = ''
        var dd2 = ''
        var dd3 = ''
        var dstr2 = ''
        var dstr3 = ''
        for (let i = 0; i < r.length; i++) {
            dd1 += `<dd index=${i}><a>${r[i].classnm}</a></dd>`
        
        }
        
        for (let j = 0; j < r[0].xilie.length; j++) {
            dd2 += `<dd><a>${r[0].xilie[j].name}</a></dd>`
        }
        for (let m = 0; m < r[0].hotbrand.length; m++) {
            dd3 += `<dd><a>${r[0].hotbrand[m].name}</a></dd>`
        }
        dstr1 += `<dt class="am-badge am-round">产品分类</dt>
            <div class="dd-conent">
                <dd class="select-all selected"><a>全部</a></dd>
                ${dd1}
            </div>`
        dstr2 = `<dt class="am-badge am-round">产品子类</dt>
            <div class="dd-conent">
                <dd class="select-all selected"><a>全部</a></dd>
                ${dd2}
            </div>`
        dstr3 = `<dt class="am-badge am-round">热门品牌</dt>
            <div class="dd-conent">
                <dd class="select-all selected"><a>全部</a></dd>
               ${dd3}
            </div>`
        dl1.innerHTML = dstr1
        dl2.innerHTML = dstr2
        dl3.innerHTML = dstr3

        $("span.love").click(function () {
            $(this).toggleClass("active");
        });


        $("#select1 dd").click(function () {
            dd2=''
            dd3=''
            for (let j = 0; j < r[$(this)[0].attributes.index.value].xilie.length; j++) {
                dd2 += `<dd><a>${r[$(this)[0].attributes.index.value].xilie[j].name}</a></dd>`
            }
            dstr2 = `<dt class="am-badge am-round">产品子类</dt>
            <div class="dd-conent">
                <dd class="select-all selected"><a>全部</a></dd>
                ${dd2}
            </div>` 
            dl2.innerHTML = dstr2

            for (let m = 0; m < r[$(this)[0].attributes.index.value].hotbrand.length; m++) {
                dd3 += `<dd><a>${r[$(this)[0].attributes.index.value].hotbrand[m].name}</a></dd>`
            }
            dstr3 = `<dt class="am-badge am-round">热门品牌</dt>
            <div class="dd-conent">
                <dd class="select-all selected"><a>全部</a></dd>
               ${dd3}
            </div>`
            dl3.innerHTML = dstr3
            
            $(this).addClass("selected").siblings().removeClass("selected");
            if ($(this).hasClass("select-all")) {
                $("#selectA").remove();
            } else {
                var copyThisA = $(this).clone();
                if ($("#selectA").length > 0) {
                    $("#selectA a").html($(this).text());
                } else {
                    $(".select-result dl").append(copyThisA.attr("id", "selectA"));

                }
            }

            $("#select2 dd").click(function () {
                $(this).addClass("selected").siblings().removeClass("selected");
                if ($(this).hasClass("select-all")) {
                    $("#selectB").remove();
                } else {
                    var copyThisB = $(this).clone();
                    if ($("#selectB").length > 0) {
                        $("#selectB a").html($(this).text());
                    } else {
                        $(".select-result dl").append(copyThisB.attr("id", "selectB"));
                    }
                }
            });
    
            $("#select3 dd").click(function () {
                $(this).addClass("selected").siblings().removeClass("selected");
                if ($(this).hasClass("select-all")) {
                    $("#selectC").remove();
                } else {
                    var copyThisC = $(this).clone();
                    if ($("#selectC").length > 0) {
                        $("#selectC a").html($(this).text());
                    } else {
                        $(".select-result dl").append(copyThisC.attr("id", "selectC"));
                    }
                }
            });
    
            $("#selectA").on("click", function () {
                $(this).remove();
                $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
            });
    
            $("#selectB").on("click", function () {
                $(this).remove();
                $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
            });
    
            $("#selectC").on("click", function () {
                $(this).remove();
                $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
            });
    
            $(".select dd").on("click", function () {
                if ($(".select-result dd").length > 1) {
                    $(".select-no").hide();
                    $(".eliminateCriteria").show();
                    $(".select-result").show();
                } else {
                    $(".select-no").show();
                    $(".select-result").hide();
    
                }
            });
    
            $(".eliminateCriteria").on("click", function () {
                $("#selectA").remove();
                $("#selectB").remove();
                $("#selectC").remove();
                $(".select-all").addClass("selected").siblings().removeClass("selected");
                $(".eliminateCriteria").hide();
                $(".select-no").show();
                $(".select-result").hide();
    
            });

        });

        

    })


    console.log(window.location.href);
    if (window.location.href == 'http://127.0.0.1:5500/home/search.html') {
        
        // 请求所有商品
        Ajax("get","../data/goods.json","",function(res){
            var r= JSON.parse(res);
            console.log(r);
            var listr = ''
            var ullist=document.getElementById("ullist");
            for(var i=0;i<r.length;i++){
                listr+=`<li class="goodli" index=${r[i].detail}>
                <div class="i-pic limit">
                    <img src="${r[i].imgurl}" />
                    <p class="title fl">${r[i].name}</p>
                    <p class="price fl">
                        <b>¥</b>
                        <strong>${r[i].price}</strong>
                    </p>
                    <p class="number fl">
                        销量<span>1110</span>
                    </p>
                </div>
            </li>`
            }
            ullist.innerHTML=listr
            liclick()
        })
    } else {
        // 请求带参数的接口
        var classnm = decodeURI(window.location.href.split("?")[1].split("=")[1]);
        console.log(classnm);
        // 狗类   
        getgoods("狗",0,5);  
        
        // 猫类     
        getgoods("猫",6,11);
        // 水族类     
        getgoods("水",12,17)
        // 鼠类     
        getgoods("鼠",18,23);
        
    }

    // 请求数据函数
    function getgoods(str,start,end){
        if(classnm.indexOf(str)==0){
            Ajax("get","../data/goods.json","",function(res){
                var r= JSON.parse(res);
                console.log(r);
                var listr = ''
                var ullist=document.getElementById("ullist");
                for(var i=start;i<=end;i++){
                    listr+=`<li class="goodli" index=${r[i].detail}>
                    <div class="i-pic limit">
                        <img src="${r[i].imgurl}" />
                        <p class="title fl">${r[i].name}</p>
                        <p class="price fl">
                            <b>¥</b>
                            <strong>${r[i].price}</strong>
                        </p>
                        <p class="number fl">
                            销量<span>1110</span>
                        </p>
                    </div>
                </li>`
                }
                console.log(listr,ullist);
                ullist.innerHTML=listr;
                liclick();
            })
        }
    }


    // li点击函数
    function liclick(){
        var goodlis = document.getElementsByClassName("goodli");
        for(let i=0;i<goodlis.length;i++){
            goodlis[i].onclick= function(){
                var a = this.getAttribute("index");
                window.location.href="introduction.html?detail="+a;
            }
        }
    }

}
