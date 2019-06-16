const http = require('http');
const url = require('url');
const qs = require('querystring');
const Template = require('./template');
const Model = require('./model');

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;

    if (pathName === '/') {
        const html = template.loginPage();
        res.end(html);
    }
    if (pathName === '/home') {
        const html = template.home();
        res.end(html);
    }
    if (pathName === '/signup') {
        const { query } = url.parse(req.url);
        const { id, pwd } = qs.parse(query);

        if (id === '') {
            const html = template.loginPage(`아이디를 입력해 주세요.`);
            res.end(html);
        } else if (pwd === '') {
            const html = template.loginPage(`비밀번호를 입력해 주세요.`);
            res.end(html);
        } else {
            if (model.isFileExist({ folder: 'users', file: id, type: 'json' })) {
                const html = template.loginPage(`${id}는 사용중입니다.`);
                res.end(html);
            } else {
                model.createID({ id, pwd });
                const html = template.loginPage('아이디가 생성되었습니다.');
                res.end(html);
            }
        }
    }
})

server.listen(8000);
server.on('listening', () => {
    console.log('8000번 포트');
});
server.on('error', (error) => {
    console.error(error);
});

const template = new Template();
const model = new Model();
