window.onload = function () {
    // 手机号正则
    var phone = /^1[3-9]\d{9}$/;
    // 密码正则
    var easy = /(^\d{6,18}$)|(^[a-zA-Z]{6,18}$)/;
    var middle = /(?!^[a-zA-Z]{6,18}$)(?!^\d{6,18}$)^[a-zA-Z0-9]{6,18}$/;
    var hard = /(?!^\d{6,18}$)(?!^[a-zA-Z]{6,18}$)(?!^[a-zA-Z0-9]{6,18}$)(?!^[/_!@#$%^&]{6,18}$)^[a-zA-Z0-9/_!@#$%^&]{6,18}$/;
    //邮箱正则
    var email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-0]+$/;

    var registe_content = document.getElementsByClassName('registe_content')[0];
    var inps = registe_content.getElementsByTagName('input');
    var btn = document.getElementsByClassName('registe_btn')[0];
    var spans = registe_content.getElementsByTagName('span');
    console.log(registe_content, inps, spans, btn)

    for (var i = 0; i < inps.length; i++) {
        inps[i].tag = false;
    }

    //电话号码判断
    inps[1].onblur = function () {
        if (phone.test(this.value)) {
            spans[0].innerHTML = '√';
            spans[0].style.color = 'lightgreen';
            this.tag = true;
        } else {
            spans[0].innerHTML = 'X';
            spans[0].style.color = 'red';
            this.tag = false;
        }
    }

    //密码强弱判断
    inps[2].onblur = function () {
        if (easy.test(this.value)) {
            spans[1].innerHTML = '低';
            spans[1].style.color = 'lightgreen';
            this.tag = true;
        } else if (middle.test(this.value)) {
            spans[1].innerHTML = '中';
            spans[1].style.color = 'lightgreen';
            this.tag = true;
        } else if (hard.test(this.value)) {
            spans[1].innerHTML = '高';
            spans[1].style.color = 'lightgreen';
            this.tag = true;
        } else {
            spans[1].innerHTML = '密码格式错误';
            spans[1].style.color = 'red';
            this.tag = false;
        }
    }

    //确认密码
    inps[3].onblur = function () {
        if (inps[2].value == this.value) {
            spans[2].innerHTML = '√';
            spans[2].style.color = 'lightgreen';
            this.tag = true;
        } else {
            spans[2].innerHTML = '密码不一致';
            spans[2].style.color = 'red';
            this.tag = false;
        }
    }

    //邮箱规则
    inps[4].onblur = function () {
        if (email.test(this.value)) {
            spans[3].innerHTML = '√';
            spans[3].style.color = 'lightgreen';
            this.tag = true;
        } else {
            spans[3].innerHTML = 'X';
            spans[3].style.color = 'red';
            this.tag = false;
        }
    }

    //清空工作
    function clean(){
        for(var i=0;i<spans.length;i++){
            inps[i].value='';
            spans[i].value = '*'
        }

    }

    btn.onclick = function () {
        // 判断每一个输入框 是否符合规则  转换成看tag的值
        for (var i = 1; i < inps.length - 1; i++) {

            // 只要有一个为false, 当前页面就有错误
            // 结束运行
            if (inps[i].tag == false) {
                alert('请检查页面信息');
                return false;
            } else {

                var user ={
                    "nickname":inps[0].value,
                    "phone":inps[1].value,
                    "password":inps[2].value,
                    "email":inps[4].value
                }

                
                console.log();
                // //信息符合规范且填写完成向接口发送post请求
                Ajax('post','http://192.168.31.132:8888/User/register',JSON.stringify(user),function(res){
                    console.log(res);
                    var obj = JSON.parse(res); 
                    if(obj.code == 200){
                        alert(obj.info);
                        location.href = './login.html'
                    }if(obj.code == 201){
                        alert(obj.info);
                        clean();
                    }
                })
                // btn.type="submit"
                
                
                // location.href = './login.html';
            }
            return false;
        }
    }



}