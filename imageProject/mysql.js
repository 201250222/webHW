import express from 'express';
import url from 'url';
import { create } from 'svg-captcha';
import pkg from 'bcryptjs';
const { compare, hashSync } = pkg;
import pkg1 from 'jsonwebtoken';
const { sign } = pkg1;
import { expressjwt } from 'express-jwt';
import session from 'express-session';
import pkg2 from 'body-parser';
const { urlencoded } = pkg2;
import { createConnection } from 'mysql';
import { get } from 'http';

/**
 * app init
 */
let app = express();

app.use("/", express.static("../imageProject"))

app.use(session({  // session
    name: 'session',
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 120000 }
}))

app.use(urlencoded({ extended: false })); //url

var connection = createConnection({ // mysql
    host: 'localhost',
    user: 'root',
    password: '789632145yjj',
    database: 'imguser',
    port: '3306'
});

connection.connect();

const secretKey = 'key'; // jwt-secretKey

app.use('http://127.0.0.1:8080',expressjwt({ // jwt
    secret: secretKey,
    algorithms: ["HS256"]
}).unless({
    path: [
        '/^\/getUserInfo\/.*\/.*',
        '/getID',
        '/^\/addUser\/.*/\/.*/\/.*/\/.*/\/.*/',
        '/^\/getCode\/.*/',
        '/^\/checkCode\/.*/'
    ]
}))


app.get("/getUserInfo/:email/:pwd", (req, res) => {
    var selectSQL = `SELECT * FROM user WHERE email = '${req.params.email}'`
    console.log(selectSQL)
    connection.query(selectSQL, (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result[0])
            let compareRes = compare(hashSync(req.params.pwd, 10), result[0].password)
            if(compareRes){
                const userInfo = result[0].email
                const a = {...userInfo}
                const token = sign(a, secretKey, {expiresIn: '1h'})
                req.session.token = token
                res.json({token: token, userInfo: result[0]})
            }
            else res.send("pwdError")
        }
    })
})


app.get("/getID", (req, res) => {
    var selectSQL = `SELECT MAX(id) AS id FROM user`
    console.log(selectSQL)
    connection.query(selectSQL, (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result[0])
            res.json(result[0])
        }
    })
})

app.get("/addUser/:id/:name/:email/:phone/:password", (req, res) => {
    let pwd = hashSync(req.params.password, 10)
    var insertSQL = `INSERT INTO user VALUES(${req.params.id}, '${req.params.name}', '${req.params.email}', '${req.params.phone}', '${pwd}' )`
    connection.query(insertSQL, (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result);
            res.send(result)
        }
    })
})

app.get("/getCode/:t", (req, res) => {
    var codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        fontSize: 42,
        color: true,//开启文字颜色
        background: "#cc9966",//背景色
        width: 150,
        height: 44
    }
    var captcha = create(codeConfig);

    req.session.checkcode = captcha.text.toLowerCase()
    console.log(req.session.checkcode)
    var codeData = {
        img: captcha.data
    }
    res.type('svg');
    res.status(200).send(captcha.data);
})

app.get("/checkCode/:input", (req, res) => {
    let input = req.params.input
    if(input.toLowerCase() === req.session.checkcode){
        res.status(200).send("true")
    }else{
        res.status(200).send("false")
    }
})


app.listen(8080);
console.log("Sever is running at http://127.0.0.1:8080/")

// connection.end();