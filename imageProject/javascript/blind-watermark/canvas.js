// Parameters optimized according to tests.
function writeMsgToCanvas(canvasid,msg,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    var f = writeMsgToCanvas_base;
    switch (mode) {
        case 1: return f(canvasid, msg, pass, true, 23, 2, [2, 9, 16], true, false);
        case 2: return f(canvasid, msg, pass, true, 17, 3, [1, 8], true, false);
        case 3: return f(canvasid, msg, pass, true, 17, 5, [1, 8], true, false);
        case 4: return f(canvasid, msg, pass, true, 5, 5, [0], true, false);
        case 5: return f(canvasid, msg, pass, true, 5, 6, [0], true, true);

        case 0:
        default: return f(canvasid, msg, pass, false, 1);
    }
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas(canvasid,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    var f = readMsgFromCanvas_base;
    switch (mode) {
        case 1: return f(canvasid, pass, true, 23, 2, [2, 9, 16], true, false)[1];
        case 2: return f(canvasid, pass, true, 17, 3, [1, 8], true, false)[1];
        case 3: return f(canvasid, pass, true, 17, 5, [1, 8], true, false)[1];
        case 4: return f(canvasid, pass, true, 5, 5, [0], true, false)[1];
        case 5: return f(canvasid, pass, true, 5, 6, [0], true, true)[1];
        case 0:
        default: return f(canvasid, pass, false, 1)[1];
    }
}
