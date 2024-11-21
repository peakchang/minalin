import express from "express";
import { sql_con } from '../back-lib/db.js'

const adminRouter = express.Router();


adminRouter.get('/load_detail_image_list', async (req, res, next) => {
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



adminRouter.get('/load_main_image_list', async (req, res, next) => {
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



adminRouter.post('/update_detail_image_list', async (req, res, next) => {
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


adminRouter.post('/update_main_image_list', async (req, res, next) => {
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

export { adminRouter }