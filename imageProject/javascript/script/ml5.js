console.log('ml5 version:', ml5.version);

let fileElem = document.getElementById('file');

fileElem.addEventListener('change', fileChanged, false);

function fileChanged(evt) {
    let file = evt.target.files[0];
    if(!file) return;
    
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('image1').setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(file);
}

log('加载中...');
let styler = ml5.styleTransfer('data/model/style-transfer/wave', function() {
// let styler = ml5.styleTransfer('data/model/style-transfer/udnie', function() {
    log('加载成功...');
})

function transfer() {
    log('转换中...');
    
    let inImg = document.getElementById('image1');
    let outImg = document.getElementById('image2');
    
    setTimeout(function() {
        styler.transfer(inImg, function(err, result) {
            outImg.setAttribute('src', result.src);
        })
        log('');
    }, 10);
}

function log(c) {
    document.getElementById('result').innerHTML = c;
}
