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


apiRouter.get('/load_detail_image_list', async (req, res, next) => {
    let detail_image_list = [];
    // let detail_image_list = [];
    try {
        const getBaseDataQuery = "SELECT detail_image_list FROM base_data WHERE config = ?"
        const [baseDataRow] = await sql_con.promise().query(getBaseDataQuery, ['base']);
        console.log(baseDataRow);
        if (baseDataRow[0]) {
            detail_image_list = baseDataRow[0].detail_image_list
        }

        // detail_image_list = baseDataRow[0].detail_image_list
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get base data' });
    }

    res.json({ detail_image_list })
})



apiRouter.get('/load_main_image_list', async (req, res, next) => {
    let main_image_list = [];
    // let detail_image_list = [];
    try {
        const getBaseDataQuery = "SELECT main_image_list FROM base_data WHERE config = ?"
        const [baseDataRow] = await sql_con.promise().query(getBaseDataQuery, ['base']);
        console.log(baseDataRow);
        if (baseDataRow[0]) {
            main_image_list = baseDataRow[0].main_image_list
        }

        // detail_image_list = baseDataRow[0].detail_image_list
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get base data' });
    }

    res.json({ main_image_list })
})



apiRouter.post('/update_detail_image_list', async (req, res, next) => {
    console.log('안들어오는거야? 못찾아?');
    
    const imgArrStr = req.body.imgArrStr
    try {
        const baseDataChk = "SELECT * FROM base_data WHERE config = ?"
        const [baseData] = await sql_con.promise().query(baseDataChk, ['base']);
        console.log(baseData);
        
        if (baseData.length > 0) {
            const mainImageUpdateQuery = "UPDATE base_data SET detail_image_list = ? WHERE config = ?";
            await sql_con.promise().query(mainImageUpdateQuery, [imgArrStr, 'base']);
        } else {
            const baseDataInsertQuery = "INSERT INTO base_data (config, detail_image_list) VALUES (?,?)";
            await sql_con.promise().query(baseDataInsertQuery, ['base', imgArrStr]);
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update base data' });
    }
    return res.json({})
})


apiRouter.post('/update_main_image_list', async (req, res, next) => {
    console.log('안들어오는거야? 못찾아?');
    
    const imgArrStr = req.body.imgArrStr
    try {
        const baseDataChk = "SELECT * FROM base_data WHERE config = ?"
        const [baseData] = await sql_con.promise().query(baseDataChk, ['base']);
        console.log(baseData);
        
        if (baseData.length > 0) {
            const mainImageUpdateQuery = "UPDATE base_data SET main_image_list = ? WHERE config = ?";
            await sql_con.promise().query(mainImageUpdateQuery, [imgArrStr, 'base']);
        } else {
            const baseDataInsertQuery = "INSERT INTO base_data (config, main_image_list) VALUES (?,?)";
            await sql_con.promise().query(baseDataInsertQuery, ['base', imgArrStr]);
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update base data' });
    }
    return res.json({})
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