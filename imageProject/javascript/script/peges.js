function setUserInfo(){
    var data = window.sessionStorage.getItem('data')
    console.log(data)
    document.getElementById("name").innerText = '欢迎你，' + data;
}