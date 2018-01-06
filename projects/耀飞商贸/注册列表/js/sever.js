function pwdFocus(){
    var pwd=document.getElementById("pwd");
    var pwdId=document.getElementById("pwdId");
    pwdId.className="error_prompt";
    pwdId.innerHTML="密码长度小于6";
}

function pwdBulr(){
    var pwd=document.getElementById("pwd");
    var pwdId=document.getElementById("pwdId");
    if(pwd.value==""){
        pwdId.className = "error_prompt";
        pwdId.innerHTML = "密码不能为空，请填写";
        return false;
    }
    if(pwd.value.length>6){
        pwdId.className = "error_prompt";
        pwdId.innerHTML = "密码长度必须小于6";
        return false;
    }
    pwdId.className = "ok_prompt";
    pwdId.innerHTML = "密码符合规范";
    return true;
}
function repwdBulr(){
    var pwd=document.getElementById("pwd");
    var repwd=document.getElementById("repwd");
    var repwdId=document.getElementById("repwdId");
    if(repwd.value==""){
        repwdId.className = "error_prompt";
        repwdId.innerHTML = "重复密码不能为空，请再次填写";
        return false;
    }
    if(repwd.value!=pwd.value){
        repwdId.className = "error_prompt";
        repwdId.innerHTML = "两次输入密码不一样，请再次填写";
        return false;
    }
    repwdId.className = "ok_prompt";
    repwdId.innerHTML = "密码符合规范";
    return true;
}
function telBulr(){
    var tel = document.getElementById("tel");
    var telId = document.getElementById("telId");
    var telReg = /^(177|139)\d{8}$/;
    if(tel.value == "") {
        telId.className = "error_prompt";
        telId.innerHTML = "手机号码不能为空，请填写";
        return false;
    }
    if(telReg.test(tel.value) == false) {
        telId.className = "error_prompt";
        telId.innerHTML = "手机号码不符合规范，请重新输入";
        return false;
    }
    telId.className = "ok_prompt";
    telId.innerHTML = "手机号码输入正确";
    return true;
}