import express from "express";
import multer from "multer";
import moment from "moment-timezone";
import fs from "fs";

import { sql_con } from '../back-lib/db.js'

const apiRouter = express.Router();

let img_upload = multer({
    storage: multer.diskStorage({
        // 경로를 설정
        destination(req, file, cb) {
            const setFolder = imgFolderChk();
            cb(null, setFolder);
        },
        filename(req, file, cb) {
            //파일명 설정
            cb(null, file.originalname);
        },
    }),
    // limits: { fileSize: 10 * 1024 * 1024 },
});

apiRouter.get('/', (req, res) => {
    res.send('asldfjalisjdfliajsdf')
})




apiRouter.post('/delete_sort_img', async (req, res, next) => {
    const body = req.body;
    const delPath = `public\\uploads\\image\\${body.getImgName}`

    console.log(delPath);


    try {
        await fs.unlink(delPath, (err) => {
        })
    } catch (error) {
        console.error(error);
    }
    res.json({})
})
apiRouter.post('/upload_img', img_upload.single('onimg'), (req, res, next) => {
    console.log('여긴 문제 없었는데?');

    console.log(img_upload);
    let status = true;
    let baseUrl
    let saveUrl

    try {
        const lastFolderArr = req.file.destination.split('/');
        const lastFolder = lastFolderArr[lastFolderArr.length - 1];
        var origin = req.get('host');
        baseUrl = req.protocol + '://' + origin + '/' + lastFolder + '/' + req.file.filename;
        saveUrl = req.file.path

        console.log(baseUrl);
        console.log(saveUrl);



        console.log(req.file.filename);

    } catch (error) {
        status = false;
    }

    res.json({ status, baseUrl, saveUrl })
})

function imgFolderChk() {
    let setFolder
    const now = moment().format('YYMMDD')

    console.log('111111');

    try {
        fs.readdirSync(`public`);
    } catch (error) {
        fs.mkdirSync(`public`);
    }

    console.log('222222');
    try {
        fs.readdirSync(`public/uploads`);
    } catch (error) {
        fs.mkdirSync(`public/uploads`);
    }
    console.log('333333');
    try {
        fs.readdirSync(`public/uploads/image`);
    } catch (error) {
        fs.mkdirSync(`public/uploads/image`);
    }
    console.log('444444');
    try {
        fs.readdirSync(`public/uploads/image`);
    } catch (error) {
        console.error(error.message);
        fs.mkdirSync(`public/uploads/image`);
    }
    console.log('555555');

    setFolder = `public/uploads/image`


    return setFolder;
}

export { apiRouter }