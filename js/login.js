window.onload = function () {
    var phonenum = document.getElementsByClassName("num")[0];
    var pwd = document.getElementsByClassName("pwd")[0];
    var btn = document.getElementsByClassName("login_btn")[0];
    var rember = document.getElementsByClassName("rember")[0];
    var alertbox = document.getElementsByClassName("alertbox")[0];

    btn.onclick = function () {
        if (phonenum.value == '' || pwd.value == '') {
            alertbox.style.display = "block"
            setTimeout(function () {
                alertbox.style.display = "none"
            }, 2000)
        } else {
            var user = {
                "phone": phonenum.value,
                "password": pwd.value
            }
            console.log(user);
            console.log(JSON.stringify(user));
            console.log(history);
            Ajax('post', 'http://192.168.31.132:8888/User/login', JSON.stringify(user), function (res) {

                var obj = JSON.parse(res);
                console.log(res);
                //如果登录成功
                if (obj.code == 200) {
                    alert(obj.info);
                    //将结果中的用户信息存到Localstorage
                    localStorage.nickname = obj.user.nickname
                    localStorage.phone = obj.user.phone
                    localStorage.email = obj.user.email
                    localStorage.password = obj.user.password
                    localStorage.addressid = obj.user.addressid
                    //跳转到首页
                   window.location=("./home.html")

                }
                if (obj.code == 201) {
                    alert(obj.info)
                    //如果错误就做清空
                }
            })
        }
    }

}