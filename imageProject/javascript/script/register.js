let res;
function register() {
    let id = 0;
    let name = document.getElementById("username").value
    if(name == '') name = "null"
    let email = document.getElementById("email").value
    if(email == '') email = "null"
    let pwd = document.getElementById("password").value
    if(pwd == '') pwd = "null"
    let phone = document.getElementById("tel").value
    if(phone == '') phone = "null"
    $.ajax({
        url: 'http://127.0.0.1:8080/getID',
        type: 'get',
        success: function (data) {
            id = data.id;
            console.log("ID is:" + id);
        },
        error: function () {
            console.log("--fail to get id--")
        }
    })
    let geturl = 'http://127.0.0.1:8080/addUser/' + id + "/" + name + "/" + email + "/" + phone + "/" + pwd;
    $.ajax({
        url: geturl,
        type: 'get',
        success: function (data) {
            console.log("succeed")
            location.replace("./index.html");

        },
        error: function () {
            console.log("--error--")
            alert("注册失败")
        }
    })
}

function checkPwd(){
    let pwd = document.getElementById("password").value
    let level = judgeLevel(pwd)
    let msg
    if(level==-1) msg = '密码长度小于6位,请重新输入'
    else if(level<25) msg = '密码强度非常弱'
    else if(level<50) msg = '密码强度弱'
    else if(level<60) msg = '密码强度一般'
    else if(level<70) msg = '密码强度强'
    else if(level<80) msg = '密码强度非常强'
    else if(level<90) msg = '密码强度安全'
    else msg = '密码强度非常安全'
    document.getElementById("check").innerText = msg
    document.getElementById("checkPwd").removeAttribute("hidden")
}

function judgeLevel(pwd){
    let scores = 0;
    let hasDigit=false,hasLower=false,hasUpper=false,hasChar=false;
    if(pwd.length < 6){
        return -1;
    }
    // 长度
    if(pwd.length<=7) scores += 10
    else scores += 25
    //字母
    if (pwd.match(/[a-z]+/g)) {
        hasLower = true
        scores += 10
    }
    if (pwd.match(/[A-Z]+/g)) {
        hasUpper = true
        scores += 10
    }
    //数字
    if (pwd.match(/\d+/g)) {
        hasDigit = true
        let nums = pwd.match(/\d+/g)
        let numLen = 0
        for(let i=0;i<nums.length;++i){
            numLen += nums[i].length
        }
        if(numLen>=3) scores+=20
        else scores+=10
    }
    //字符
    if (pwd.match(/[^a-zA-Z0-9]+/g)) {
        hasChar = true
        let chars = pwd.match(/[^a-zA-Z0-9]+/g)
        let charLen = 0
        for(let i=0;i<chars.length;++i){
            charLen += chars[i].length
        }
        if(charLen>1) scores+=25
        else scores+=10
    }
    if(hasDigit&&(hasLower||hasUpper)){
        scores += 2
        if(hasChar) scores+=3
    }
    if(hasChar&&hasDigit&&hasLower&&hasUpper) scores += 5
    return scores;
}

function getCode(){
    // 添加时间戳进行验证码切换
    document.getElementById("img_check").src = `http://127.0.0.1:8080/getCode/${new Date().getTime()}`;
}

function checkCode(){
    let input = document.getElementById("checkcode").value
    if(input == '') input = '0'
    let url = 'http://127.0.0.1:8080/checkCode/' + input
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            console.log("check result is:" + data)
            if(data === "false"){
                document.getElementById("checkMsg").removeAttribute("hidden")
                document.getElementById("registerBtn").setAttribute('hidden', "hidden")
                document.getElementById("checkcodeMSG").innerText = "验证码错误请重新输入"
            }else{
                document.getElementById("checkMsg").setAttribute('hidden', "hidden")
                document.getElementById("registerBtn").removeAttribute("hidden")
            }
        },
        error: function () {
            console.log("--error--")
        }
    })
}