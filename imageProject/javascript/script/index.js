let res;

function login(){
    let email = document.getElementById("nameInput").value
    let pwd = document.getElementById("pwdInput").value
    // pwd = hashSync(pwd)
    if(email==''||pwd=='') return
    let geturl = 'http://127.0.0.1:8080/getUserInfo/' + email + "/" + pwd
    $.ajax({
        url: geturl,
        type: 'get',
        success: function (data) {
            res = data;
            console.log("--success--")
            if (res == null || res == {} || res == []) {
                alert("用户不存在，请注册")
                return;
            }
            if (res == "pwdError") {
                alert("密码错误，请重试")
                return;
            }
            location.replace("./main.html");
            window.sessionStorage.setItem('data', res.userInfo.email);
            window.sessionStorage.setItem('token', res.token);
        },
        error: function () {
            console.log("--error--")
            alert("用户不存在，请注册")
        }
    })
}