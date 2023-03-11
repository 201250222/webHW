function setTheme(className){
    document.getElementsByTagName('html')[0].setAttribute('class', className)
}

const setCssVar = (prop, val, dom = document.documentElement) => {
    dom.style.setProperty(prop, val);
}

function setUserInfo(){
    var data = window.sessionStorage.getItem('data')
    console.log(data)
    document.getElementById("name").innerText = '欢迎你，' + data;
}