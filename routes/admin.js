import express from "express";
import { sql_con } from '../back-lib/db.js'
import moment from "moment";

const adminRouter = express.Router();
// 일정 관리 부분!!!!
// 일정 추가!!!
adminRouter.post('/add_schedule', async (req, res, next) => {
    const body = req.body;
    const addScheduleQuery = "INSERT INTO reserve_manage (date, start_time, end_time, orderer_name) VALUES (?,?,?,?)"
    await sql_con.promise().query(addScheduleQuery, [body.date, body.start_time, body.end_time, body.orderer_name]);
    res.json({})
})

// 일정 불러오기!!

adminRouter.post('/load_schedule', async (req, res, next) => {
    const body = req.body;

    let scheduleList = [];
    try {
        const loadScheduleQuery = `SELECT * FROM reserve_manage WHERE date BETWEEN ? AND ?;`;
        const [scheduleListTemp] = await sql_con.promise().query(loadScheduleQuery, [body.startDate, body.endDate]);
        scheduleList = scheduleListTemp
        console.log(scheduleList);

    } catch (error) {

    }


    res.json({ scheduleList })
})


// 이미지 처리 부분~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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