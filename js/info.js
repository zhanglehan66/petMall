window.onload=function(){
    // 记录初始电话号码
    var firstphone = localStorage.phone

    var nick = document.getElementsByClassName("nickname")[0];
    nick.innerHTML = localStorage.nickname;

    // 将名字填入
    var username = document.getElementById("user-name2");
    username.value = localStorage.nickname;
     
    // 电话填入
    var phone = document.getElementById("user-phone");
    phone.value = localStorage.phone;
    
    // 邮箱填入
    var email = document.getElementById("user-email");
    email.value = localStorage.email;

   
    //填密码
    var psd = document.getElementById("user-psd");
    psd.value = localStorage.password
    
    // 修改提交
    var updatebtn = document.getElementById("updatebtn");
    updatebtn.onclick=function(){
        if(username.value == localStorage.nickname&&phone.value==localStorage.phone&&
            email.value == localStorage.email&&psd.value == localStorage.password){
                alert("您未修改任何信息");
            }
        else{
            var upuser = {
                "nickname":username.value,
                "phone":phone.value,
                "email":email.value,
                "password":psd.value,
                "firstphone":firstphone
            }
            console.log(upuser);

            Ajax("post","http://192.168.31.132:8888/User/updateMyInfo",JSON.stringify(upuser),function(res){
                
                var obj = JSON.parse(res);
                console.log(obj);
                if(obj.code == 200){
                    alert(obj.info);
                    localStorage.nickname = obj.user.nickname
                    localStorage.email = obj.user.email
                    localStorage.phone = obj.user.phone
                    localStorage.password = obj.user.password
                    location.reload()
                }if(obj.code == 201){
                    alert(obj.info);
                }
            })
        }
    }
    

}